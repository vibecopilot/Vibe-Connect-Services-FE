import React from "react";
import { render, screen } from "@testing-library/react";
import Avatar from "../Avatar";
import { User } from "lucide-react";

describe("Avatar Component", () => {
  test("renders image when src is provided", () => {
    render(<Avatar src="https://example.com/image.jpg" alt="User Avatar" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  test("renders initials when src fails to load", () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  test("renders fallback icon when no src and no name", () => {
    render(<Avatar fallbackIcon={<User data-testid="fallback-icon" />} />);
    expect(screen.getByTestId("fallback-icon")).toBeInTheDocument();
  });

  test("uses correct size and shape classes", () => {
  render(<Avatar name="Jane" size="lg" rounded={false} />);
  const innerSpan = screen.getByText("J");
  const wrapper = innerSpan.parentElement as HTMLElement;
  expect(wrapper.className).toMatch(/w-16 h-16/);
  expect(wrapper.className).toMatch(/rounded-md/);
});

});
