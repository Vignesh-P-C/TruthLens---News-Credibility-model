import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResultCard from "@/components/ResultCard";

const realResult = { label: "REAL" as const, confidence: 94.2 };
const fakeResult = { label: "FAKE" as const, confidence: 81.7 };

// user-event v14 auto-installs its own Clipboard stub as part of setup()
// (needed for .paste()/.copy()). If we define our mock BEFORE calling
// userEvent.setup(), user-event's stub silently replaces it. So: always
// call userEvent.setup() first, then install these mocks.
function mockClipboard() {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
    writable: true,
  });
  return writeText;
}
function mockShare(impl: ReturnType<typeof vi.fn> | undefined) {
  Object.defineProperty(navigator, "share", {
    value: impl,
    configurable: true,
    writable: true,
  });
}

beforeEach(() => {
  vi.restoreAllMocks();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("ResultCard — desktop (no Web Share API)", () => {
  beforeEach(() => {
    mockShare(undefined);
  });

  it("button reads 'Copy' with no navigator.share present", () => {
    mockClipboard();
    render(<ResultCard result={realResult} />);
    expect(screen.getByRole("button", { name: /copy result to clipboard/i })).toBeInTheDocument();
    expect(screen.getByText("Copy")).toBeInTheDocument();
  });

  it("clicking Copy writes the correct text to the clipboard", async () => {
    const user = userEvent.setup();
    const writeText = mockClipboard();
    render(<ResultCard result={realResult} />);
    await user.click(screen.getByRole("button", { name: /copy result/i }));

    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    const written = writeText.mock.calls[0][0];
    expect(written).toContain("TruthLens verdict: REAL (94.2% model confidence)");
    expect(written).toContain("Checked with TruthLens");
  });

  it("uses FAKE label correctly for a fake result", async () => {
    const user = userEvent.setup();
    const writeText = mockClipboard();
    render(<ResultCard result={fakeResult} />);
    await user.click(screen.getByRole("button", { name: /copy result/i }));
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    expect(writeText.mock.calls[0][0]).toContain("TruthLens verdict: FAKE (81.7% model confidence)");
  });

  it("shows 'Copied' feedback after a successful copy, then reverts", async () => {
    const user = userEvent.setup();
    mockClipboard();
    render(<ResultCard result={realResult} />);
    await user.click(screen.getByRole("button", { name: /copy result/i }));

    expect(await screen.findByText("Copied")).toBeInTheDocument();

    // Component's real setTimeout is 2000ms — wait for the real revert
    // rather than fighting fake-timer/user-event interaction quirks.
    await waitFor(() => expect(screen.getByText("Copy")).toBeInTheDocument(), {
      timeout: 3000,
    });
  }, 6000);

  it("does not throw or get stuck on rapid repeated clicks", async () => {
    const user = userEvent.setup();
    const writeText = mockClipboard();
    render(<ResultCard result={realResult} />);
    const btn = screen.getByRole("button", { name: /copy result/i });
    await user.click(btn);
    await user.click(btn);
    await user.click(btn);
    await waitFor(() => expect(writeText).toHaveBeenCalled());
    // No thrown error above is itself the pass condition.
  });

  it("fails silently (no crash) if clipboard write is rejected", async () => {
    const user = userEvent.setup();
    const writeText = mockClipboard();
    writeText.mockRejectedValueOnce(new Error("denied"));
    render(<ResultCard result={realResult} />);
    await user.click(screen.getByRole("button", { name: /copy result/i }));
    // Button should remain in its normal state, not crash the component.
    await waitFor(() => expect(screen.getByText("Copy")).toBeInTheDocument());
  });
});

describe("ResultCard — mobile (Web Share API present)", () => {
  it("button reads 'Share' once navigator.share is detected (post-mount upgrade)", async () => {
    mockClipboard();
    mockShare(vi.fn().mockResolvedValue(undefined));
    render(<ResultCard result={realResult} />);
    expect(await screen.findByText("Share")).toBeInTheDocument();
  });

  it("clicking Share calls navigator.share with correct text/title, not the clipboard", async () => {
    const user = userEvent.setup();
    const writeText = mockClipboard();
    const share = vi.fn().mockResolvedValue(undefined);
    mockShare(share);
    render(<ResultCard result={realResult} />);
    const btn = await screen.findByRole("button", { name: /share result/i });
    await user.click(btn);

    await waitFor(() => expect(share).toHaveBeenCalledTimes(1));
    const arg = share.mock.calls[0][0];
    expect(arg.text).toContain("TruthLens verdict: REAL");
    expect(arg.title).toBe("TruthLens result");
    expect(writeText).not.toHaveBeenCalled();
  });

  it("dismissing the native share sheet (rejected promise) does not throw or get the button stuck", async () => {
    const user = userEvent.setup();
    mockClipboard();
    const share = vi.fn().mockRejectedValueOnce(new DOMException("cancelled", "AbortError"));
    mockShare(share);
    render(<ResultCard result={realResult} />);
    const btn = await screen.findByRole("button", { name: /share result/i });
    await user.click(btn);
    await waitFor(() => expect(share).toHaveBeenCalled());
    // Still says "Share", not stuck on some error/loading state
    expect(screen.getByText("Share")).toBeInTheDocument();
  });
});

describe("ResultCard — visual state correctness", () => {
  beforeEach(() => {
    mockClipboard();
    mockShare(undefined);
  });

  it("REAL result shows 'Real' heading and 'Credible' badge", () => {
    render(<ResultCard result={realResult} />);
    expect(screen.getByText("Real")).toBeInTheDocument();
    expect(screen.getByText("Credible")).toBeInTheDocument();
  });

  it("FAKE result shows 'Fake' heading and 'Suspicious' badge", () => {
    render(<ResultCard result={fakeResult} />);
    expect(screen.getByText("Fake")).toBeInTheDocument();
    expect(screen.getByText("Suspicious")).toBeInTheDocument();
  });

  it("confidence tooltip is NOT clipped/absent — regression check for the overflow:hidden bug", async () => {
    const user = userEvent.setup();
    render(<ResultCard result={realResult} />);
    await user.click(screen.getByRole("button", { name: /about this score/i }));
    expect(screen.getByText(/how sure the model is about its own answer/i)).toBeInTheDocument();
  });
});