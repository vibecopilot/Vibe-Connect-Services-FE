import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DropdownMenu from "../DropdownMenu";

describe("DropdownMenu Component", () => {
  const items = [
    { label: "Edit", onClick: jest.fn() },
    { label: "Delete", onClick: jest.fn() },
  ];

  test("renders trigger button", () => {
    render(
      <DropdownMenu
        items={items}
        trigger={<button>Menu</button>}
        open={false}
        onToggle={() => {}}
      />
    );
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  test("renders menu items when open", () => {
    render(
      <DropdownMenu
        items={items}
        trigger={<button>Options</button>}
        open={true}
        onToggle={() => {}}
      />
    );
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("clicking item triggers onClick and closes menu", () => {
    const onToggle = jest.fn();
    render(
      <DropdownMenu
        items={items}
        trigger={<button>Open</button>}
        open={true}
        onToggle={onToggle}
      />
    );
    fireEvent.click(screen.getByText("Edit"));
    expect(items[0].onClick).toHaveBeenCalled();
    expect(onToggle).toHaveBeenCalledWith(false);
  });
});
