const API_BASE = "https://v1gnesh-truthlens.hf.space";

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
const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s instead of 15s
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
            message: "Cannot reach the analysis server. It may be waking up — try again in a moment.",
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
  real: `Company News for July 31, 2026

Shares of Mastercard Incorporated (MA) gained 2.5% after the company reported second-quarter 2026 earnings of $5.04 per share, beating the Zacks Consensus Estimate of $4.77 per share.

Bristol-Myers Squibb Company's (BMY) shares increased 2.8% after the company reported second-quarter 2026 earnings of $2.04 per share, surpassing the Zacks Consensus Estimate of $1.59 per share.

Shares of Altria Group, Inc. (MO) plunged 9.2% after the company reported second-quarter 2026 earnings of $1.48 per share, missing the Zacks Consensus Estimate of $1.5 per share.

Regeneron Pharmaceuticals, Inc.'s (REGN) shares jumped 6.2% after the company reported second-quarter 2026 earnings of $14.29 per share, outpacing the Zacks Consensus Estimate of $10 per share.`,

  fake: `Regional Utility Reports First Fully Autonomous Grid Segment in North America

BOISE, Idaho (Reuters) — Meridian Grid Solutions said Tuesday it had completed an 18-month pilot in which a segment of its regional power network operated without any human oversight, using an AI system to manage load balancing, fault detection, and repair scheduling independently.

Dana Whitfield, the company's vice president of operations, told reporters the system reduced maintenance costs by roughly 40 percent compared to conventionally managed segments and responded to two equipment failures during the pilot without triggering any customer-facing outage. "We didn't expect it to handle edge cases this cleanly," Whitfield said. "It's made decisions in the last six months that our own engineers wouldn't have made as quickly."

The company said federal regulators were briefed on the pilot's results last month and that Meridian plans to expand the program to three additional states by the end of next year, pending a standard safety review. Industry analysts said the approach, if replicated, could meaningfully lower operating costs across the utility sector, though several cautioned that full autonomy over critical infrastructure raises oversight questions that regulators have not yet fully addressed.`,
};
