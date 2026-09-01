import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DetectorSection from "@/components/DetectorSection";
import * as api from "@/lib/api";

const words = (n: number) => Array.from({ length: n }, (_, i) => `word${i}`).join(" ");

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("DetectorSection — truncation warning", () => {
  it("shows no warning under 190 words", async () => {
    const user = userEvent.setup();
    render(<DetectorSection />);
    const textarea = screen.getByPlaceholderText(/paste news content/i);
    await user.click(textarea);
    await user.paste(words(50));
    expect(screen.queryByText(/only the first ~190 words/i)).not.toBeInTheDocument();
  });

  it("shows no warning at exactly 190 words (threshold is strictly > 190)", async () => {
    const user = userEvent.setup();
    render(<DetectorSection />);
    const textarea = screen.getByPlaceholderText(/paste news content/i);
    await user.click(textarea);
    await user.paste(words(190));
    expect(screen.queryByText(/only the first ~190 words/i)).not.toBeInTheDocument();
  });

  it("shows the warning at 191 words", async () => {
    const user = userEvent.setup();
    render(<DetectorSection />);
    const textarea = screen.getByPlaceholderText(/paste news content/i);
    await user.click(textarea);
    await user.paste(words(191));
    expect(screen.getByText(/only the first ~190 words/i)).toBeInTheDocument();
  });

  it("warning disappears again when text is shortened back under the threshold", async () => {
    const user = userEvent.setup();
    render(<DetectorSection />);
    const textarea = screen.getByPlaceholderText(/paste news content/i);
    await user.click(textarea);
    await user.paste(words(200));
    expect(screen.getByText(/only the first ~190 words/i)).toBeInTheDocument();

    await user.clear(textarea);
    await user.paste(words(50));
    expect(screen.queryByText(/only the first ~190 words/i)).not.toBeInTheDocument();
  });

  it("loading the 'Fake' example (192 words) triggers the warning; 'Real' (115 words) does not", async () => {
    const user = userEvent.setup();
    render(<DetectorSection />);

    await user.click(screen.getByRole("button", { name: "Examples" }));
    await user.click(screen.getByRole("button", { name: /load — false example/i }));
    expect(screen.getByText(/only the first ~190 words/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Examples" }));
    await user.click(screen.getByRole("button", { name: /load — credible example/i }));
    expect(screen.queryByText(/only the first ~190 words/i)).not.toBeInTheDocument();
  });
});

describe("DetectorSection — aria-live status region", () => {
  it("is empty on initial idle load", () => {
    render(<DetectorSection />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("");
  });

  it("announces loading, then success with the CORRECT confidence number (regression check)", async () => {
    const user = userEvent.setup();
    vi.spyOn(api, "checkNews").mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ success: true, data: { label: "REAL", confidence: 94.2 } }), 150)
        )
    );

    render(<DetectorSection />);
    const textarea = screen.getByPlaceholderText(/paste news content/i);
    await user.click(textarea);
    await user.paste("This is a long enough sentence to pass the minimum length check.");
    await user.click(screen.getByRole("button", { name: /analyze/i }));

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(/analyzing article/i)
    );

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Analysis complete. Verdict: Real, 94 percent confidence."
      )
    );

    // AnimatePresence mode="wait" delays mounting the ResultCard until the
    // loading state's exit animation completes — the aria-live text updates
    // independently and immediately, but the visual card lags slightly
    // behind it, so wait for it separately with a bit more headroom.
    await waitFor(() => expect(screen.getByText("Real")).toBeInTheDocument(), {
      timeout: 2000,
    });

    // Cross-check against what's visually displayed in the result card —
    // this is the exact bug class that was caught earlier (double-multiplying
    // an already-percent confidence value). "94.2" and "%" render as separate
    // text nodes, so query the DOM directly rather than fight RTL's per-node
    // text matcher.
    const confidenceEl = Array.from(document.querySelectorAll("span")).find(
      (el) => el.textContent?.replace(/\s+/g, "") === "94.2%"
    );
    expect(confidenceEl).toBeTruthy();
  });

  it("announces the error message on failure", async () => {
    const user = userEvent.setup();
    vi.spyOn(api, "checkNews").mockResolvedValue({
      success: false,
      error: { message: "Cannot reach the analysis server.", type: "network" },
    });

    render(<DetectorSection />);
    const textarea = screen.getByPlaceholderText(/paste news content/i);
    await user.click(textarea);
    await user.paste("This is a long enough sentence to pass the minimum length check.");
    await user.click(screen.getByRole("button", { name: /analyze/i }));

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Analysis failed. Cannot reach the analysis server."
      )
    );
  });

  it("status region is screen-reader-only (sr-only), not visually hidden via display:none", () => {
    render(<DetectorSection />);
    const status = screen.getByRole("status");
    expect(status).toHaveClass("sr-only");
  });
});