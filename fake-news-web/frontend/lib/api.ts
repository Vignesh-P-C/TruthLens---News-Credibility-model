const API_BASE = "https://fake-news-detection-transformers-2.onrender.com";

export interface PredictionResult {
  label: "REAL" | "FAKE";
  confidence: number;
}

export interface PredictionError {
  message: string;
  type: "network" | "server" | "invalid_response" | "empty_text";
}

export type PredictionResponse =
  | { success: true; data: PredictionResult }
  | { success: false; error: PredictionError };

export async function checkNews(text: string): Promise<PredictionResponse> {
  if (!text || text.trim().length === 0) {
    return {
      success: false,
      error: { message: "Please enter some text to analyze.", type: "empty_text" },
    };
  }
  if (text.trim().length < 20) {
    return {
      success: false,
      error: {
        message: "Text is too short. Please provide at least a sentence or two.",
        type: "empty_text",
      },
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(`${API_BASE}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ text: text.trim() }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let msg = `Server error: ${response.status} ${response.statusText}`;
      try {
        const err = await response.json();
        if (err.detail) msg = err.detail;
      } catch {}
      return { success: false, error: { message: msg, type: "server" } };
    }

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      return {
        success: false,
        error: { message: "Invalid response from server.", type: "invalid_response" },
      };
    }

    if (
      typeof data !== "object" ||
      data === null ||
      !("label" in data) ||
      !("confidence" in data)
    ) {
      return {
        success: false,
        error: { message: "Unexpected response format.", type: "invalid_response" },
      };
    }

    const result = data as Record<string, unknown>;
    const label = result.label;
    const confidence = result.confidence;

    if (label !== "REAL" && label !== "FAKE") {
      return {
        success: false,
        error: { message: `Invalid label: "${label}".`, type: "invalid_response" },
      };
    }
    if (typeof confidence !== "number" || confidence < 0 || confidence > 1) {
      return {
        success: false,
        error: { message: "Invalid confidence value.", type: "invalid_response" },
      };
    }

    return {
      success: true,
      data: {
        label: label as "REAL" | "FAKE",
        confidence: Math.round(confidence * 10000) / 100,
      },
    };
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === "AbortError")
        return {
          success: false,
          error: {
            message: "Request timed out. Is the backend running?",
            type: "network",
          },
        };
      if (err.message.includes("fetch") || err.message.includes("Failed to fetch"))
        return {
          success: false,
          error: {
            message: "Cannot reach http://127.0.0.1:8000 — start the FastAPI server.",
            type: "network",
          },
        };
    }
    return {
      success: false,
      error: { message: "Unexpected error. Please try again.", type: "network" },
    };
  }
}

export const EXAMPLE_TEXTS = {
  real: `Scientists at the Johns Hopkins Bloomberg School of Public Health have published new research in the journal Nature Medicine showing that consistent aerobic exercise for at least 150 minutes per week significantly reduces inflammation markers in adults over 50. The study, which followed 2,400 participants over five years, found that those who maintained regular cardiovascular activity had 34% lower levels of C-reactive protein compared to sedentary individuals. The findings align with previous research from the Mayo Clinic and support current guidelines from the American Heart Association.`,

  fake: `BREAKING: Government scientists have SECRETLY confirmed that 5G towers are being used to beam mind-control frequencies directly into the brains of citizens who received COVID vaccines. A leaked document from the CDC, obtained exclusively by this outlet, reveals that nanoparticles in the vaccine activate when exposed to 5G signals, giving authorities the ability to alter human behavior. Multiple whistleblowers have come forward with proof that major tech companies and pharmaceutical giants coordinated this plan at a secret meeting in Davos last year. Share this before it gets deleted!`,
};
