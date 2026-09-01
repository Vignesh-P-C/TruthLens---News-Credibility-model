import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InfoTooltip from "@/components/InfoTooltip";

describe("InfoTooltip", () => {
  it("is closed by default", () => {
    render(<InfoTooltip title="Test title">Body text</InfoTooltip>);
    expect(screen.queryByText("Body text")).not.toBeInTheDocument();
  });

  it("opens on click", async () => {
    const user = userEvent.setup();
    render(<InfoTooltip title="Test title">Body text</InfoTooltip>);
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Body text")).toBeInTheDocument();
    expect(screen.getByText("Test title")).toBeInTheDocument();
  });

  it("closes when clicked again (toggle)", async () => {
    const user = userEvent.setup();
    render(<InfoTooltip title="Test title">Body text</InfoTooltip>);
    const btn = screen.getByRole("button");
    await user.click(btn);
    expect(screen.getByText("Body text")).toBeInTheDocument();
    await user.click(btn);
    await waitFor(() => expect(screen.queryByText("Body text")).not.toBeInTheDocument());
  });

  it("closes when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <InfoTooltip title="Test title">Body text</InfoTooltip>
        <button>outside</button>
      </div>
    );
    await user.click(screen.getByRole("button", { name: /test title/i }));
    expect(screen.getByText("Body text")).toBeInTheDocument();
    await user.click(screen.getByText("outside"));
    await waitFor(() => expect(screen.queryByText("Body text")).not.toBeInTheDocument());
  });

  it("opens via keyboard (Enter) since it's a native button", async () => {
    const user = userEvent.setup();
    render(<InfoTooltip title="Test title">Body text</InfoTooltip>);
    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.getByText("Body text")).toBeInTheDocument();
  });

  it("opening a second tooltip closes the first (independent instances, shared outside-click behavior)", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <InfoTooltip title="First">First body</InfoTooltip>
        <InfoTooltip title="Second">Second body</InfoTooltip>
      </div>
    );
    await user.click(screen.getByRole("button", { name: /^first$/i }));
    expect(screen.getByText("First body")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^second$/i }));
    expect(screen.getByText("Second body")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText("First body")).not.toBeInTheDocument());
  });

  it("does NOT close on Escape — known gap, documenting actual behavior", async () => {
    const user = userEvent.setup();
    render(<InfoTooltip title="Test title">Body text</InfoTooltip>);
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Body text")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    // This currently stays open — confirms the gap flagged in QA-CHECKLIST.md
    expect(screen.getByText("Body text")).toBeInTheDocument();
  });

  it("trigger button has no aria-expanded/aria-haspopup — known gap, documenting actual behavior", () => {
    render(<InfoTooltip title="Test title">Body text</InfoTooltip>);
    const btn = screen.getByRole("button");
    expect(btn).not.toHaveAttribute("aria-expanded");
    expect(btn).not.toHaveAttribute("aria-haspopup");
  });
});