import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GlobalContext } from "../context/GlobalContext";
import Product from "./Product";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";

test("renders Product component", () => {
  const mockContext = {
    user: null,
    cart: [],
    addToCart: vi.fn(), // Use `vi.fn()` instead of `jest.fn()`
  };

  render(
  //@ts-ignore
    <GlobalContext.Provider value={mockContext}>
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    </GlobalContext.Provider>
  );

  expect(screen.getByText(/No Prodcut/i)).toBeInTheDocument();
});