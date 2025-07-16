import React from "react";
import { render, screen } from "@testing-library/react";
import NotificationToaster from "../NotificationToaster";
import { CheckCircle } from "lucide-react";

jest.useFakeTimers();

describe("NotificationToaster Component", () => {
  test("does not render if not visible", () => {
    render(
      <NotificationToaster
        message="Hello"
        type="info"
        isVisible={false}
        onClose={() => {}}
      />
    );
    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  test("renders message and icon when visible", () => {
    render(
      <NotificationToaster
        message="Update complete"
        type="success"
        isVisible={true}
        duration={3000}
        onClose={() => {}}
        icon={<CheckCircle data-testid="toast-icon" />}
      />
    );
    expect(screen.getByText("Update complete")).toBeInTheDocument();
    expect(screen.getByTestId("toast-icon")).toBeInTheDocument();
  });

  test("automatically calls onClose after duration", () => {
    const onClose = jest.fn();
    render(
      <NotificationToaster
        message="Auto close"
        type="info"
        isVisible={true}
        duration={2000}
        onClose={onClose}
      />
    );
    jest.advanceTimersByTime(2000);
    expect(onClose).toHaveBeenCalled();
  });
});
