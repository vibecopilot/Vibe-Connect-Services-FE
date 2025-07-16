import React from "react";
import { render, screen } from "@testing-library/react";
import Badge from "../Badge";
import { Bell } from "lucide-react";

describe("Badge Component", () => {
  test("displays content", () => {
    render(<Badge content="New" />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  test("renders icon when provided", () => {
    render(<Badge content="Info" icon={<Bell data-testid="badge-icon" />} />);
    expect(screen.getByTestId("badge-icon")).toBeInTheDocument();
  });

  test("applies solid variant by default", () => {
    render(<Badge content="Solid" color="bg-blue-500" />);
    expect(screen.getByText("Solid").className).toContain("bg-blue-500");
  });

  test("applies custom size", () => {
    render(<Badge content="Small" size="sm" />);
    expect(screen.getByText("Small").className).toContain("text-xs");
  });
});
