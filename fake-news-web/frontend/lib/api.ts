const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

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
      error: {
        message: "Please enter some text to analyze.",
        type: "empty_text",
      },
    };
  }

  if (text.trim().length < 20) {
    return {
      success: false,
      error: {
        message:
          "Text is too short. Please provide at least a sentence or two for accurate analysis.",
        type: "empty_text",
      },
    };
  }

  try {
    const controller = new AbortController();

    // 🔥 Increased timeout to 90 seconds (for Render cold starts)
    const timeoutId = setTimeout(() => controller.abort(), 90000);

    const response = await fetch(`${API_BASE}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ text: text.trim() }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `Server error: ${response.status} ${response.statusText}`;

      try {
        const errorData = await response.json();
        if (errorData?.detail) {
          errorMessage = String(errorData.detail);
        }
      } catch {
        // ignore parsing error
      }

      return {
        success: false,
        error: {
          message: errorMessage,
          type: "server",
        },
      };
    }

    let data: unknown;

    try {
      data = await response.json();
    } catch {
      return {
        success: false,
        error: {
          message: "Received an invalid response from the server.",
          type: "invalid_response",
        },
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
        error: {
          message: "Unexpected response format from the API.",
          type: "invalid_response",
        },
      };
    }

    const result = data as Record<string, unknown>;
    const label = result.label;
    const confidence = result.confidence;

    if (label !== "REAL" && label !== "FAKE") {
      return {
        success: false,
        error: {
          message: `Invalid label received: "${label}". Expected REAL or FAKE.`,
          type: "invalid_response",
        },
      };
    }

    if (typeof confidence !== "number" || confidence < 0 || confidence > 1) {
      return {
        success: false,
        error: {
          message: "Invalid confidence value received from the API.",
          type: "invalid_response",
        },
      };
    }

    return {
      success: true,
      data: {
        label: label as "REAL" | "FAKE",
        confidence: Math.round(confidence * 10000) / 100, // convert to %
      },
    };
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === "AbortError") {
        return {
          success: false,
          error: {
            message:
              "The server is waking up. This can take up to a minute on first use. Please try again shortly.",
            type: "network",
          },
        };
      }

      if (
        err.message.includes("fetch") ||
        err.message.includes("network") ||
        err.message.includes("Failed to fetch")
      ) {
        return {
          success: false,
          error: {
            message:
              "Unable to connect to the analysis server. Please try again in a moment.",
            type: "network",
          },
        };
      }
    }

    return {
      success: false,
      error: {
        message: "An unexpected error occurred. Please try again.",
        type: "network",
      },
    };
  }
}

// Example texts
export const EXAMPLE_TEXTS = {
  real: `Scientists at the Johns Hopkins Bloomberg School of Public Health have published new research in the journal Nature Medicine showing that consistent aerobic exercise for at least 150 minutes per week significantly reduces inflammation markers in adults over 50. The study, which followed 2,400 participants over five years, found that those who maintained regular cardiovascular activity had 34% lower levels of C-reactive protein compared to sedentary individuals. The findings align with previous research from the Mayo Clinic and support current guidelines from the American Heart Association.`,

  fake: `BREAKING: Government scientists have SECRETLY confirmed that 5G towers are being used to beam mind-control frequencies directly into the brains of citizens who received COVID vaccines. A leaked document from the CDC, obtained exclusively by this outlet, reveals that nanoparticles in the vaccine activate when exposed to 5G signals, giving authorities the ability to alter human behavior. Multiple whistleblowers have come forward with proof that major tech companies and pharmaceutical giants coordinated this plan at a secret meeting in Davos last year. Share this before it gets deleted!`,
};