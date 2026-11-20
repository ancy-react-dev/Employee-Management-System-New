
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeForm from "./EmployeeForm";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../features/employees/employeeSlice";

const createTestStore = () =>
  configureStore({
    reducer: {
      employees: employeesReducer,
    },
  });

describe("EmployeeForm", () => {
  it("shows validation error when required fields are empty", () => {
    const onSave = vi.fn();

   render(
  <Provider store={createTestStore()}>
    <EmployeeForm onSave={onSave} />
  </Provider>
);

    fireEvent.click(
      screen.getByRole("button", { name: "Add Employee" })
    );

    expect(
      screen.getByText("Please fill in all required fields.")
    ).toBeTruthy();

    expect(onSave).not.toHaveBeenCalled();
  });

  it("adds an employee when all required fields are valid", () => {
    const onSave = vi.fn();

  render(
  <Provider store={createTestStore()}>
    <EmployeeForm onSave={onSave} />
  </Provider>
);

    fireEvent.change(
      screen.getByPlaceholderText("Enter employee name"),
      { target: { value: "Ancy" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter email"),
      { target: { value: "ancy@example.com" } }
    );
fireEvent.change(
  screen.getByPlaceholderText("Enter 10-digit mobile number"),
  { target: { value: "9876543210" } }
);
    fireEvent.change(
      document.querySelector('select[name="department"]')!,
      { target: { value: "IT" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter designation"),
      { target: { value: "Developer" } }
    );

    fireEvent.change(
      document.querySelector('input[name="joiningDate"]')!,
      { target: { value: "2026-01-15" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Add Employee" })
    );

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Employee added successfully!")).toBeTruthy();
  });
});
