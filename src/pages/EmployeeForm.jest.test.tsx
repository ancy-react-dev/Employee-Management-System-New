import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeForm from "./EmployeeForm";

describe("EmployeeForm Jest Tests", () => {

  test("should show validation error when required fields are empty", () => {
    const onSave = vi.fn();

    render(<EmployeeForm onSave={onSave} />);

    fireEvent.click(
      screen.getByRole("button", { name: "Add Employee" })
    );

    expect(
      screen.getByText("Please fill in all required fields.")
    ).toBeTruthy();

    expect(onSave).not.toHaveBeenCalled();
  });

  test("should show error for invalid email", () => {
    const onSave = vi.fn();

    render(<EmployeeForm onSave={onSave} />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter employee name"),
      { target: { value: "Ancy" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter email"),
      { target: { value: "invalid-email" } }
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

    expect(
      screen.getByText("Please enter a valid email address.")
    ).toBeTruthy();

    expect(onSave).not.toHaveBeenCalled();
  });
  test("should add employee with valid details", () => {
    const onSave = vi.fn();

    render(<EmployeeForm onSave={onSave} />);

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
  test("should update employee with edited details", () => {
  const onSave = vi.fn();

  const initialData = {
    id: 1,
    name: "Ancy",
    email: "ancy@example.com",
    phone: "9876543210",
    department: "IT",
    designation: "Developer",
    joiningDate: "2026-01-15",
    status: "Active" as const,
  };

  render(
    <EmployeeForm
      initialData={initialData}
      onSave={onSave}
    />
  );

  fireEvent.change(
    screen.getByPlaceholderText("Enter employee name"),
    { target: { value: "Ancy John" } }
  );

  fireEvent.click(
    screen.getByRole("button", { name: "Update Employee" })
  );

  expect(onSave).toHaveBeenCalledTimes(1);

  expect(onSave).toHaveBeenCalledWith(
    expect.objectContaining({
      id: 1,
      name: "Ancy John",
    })
  );

  expect(
    screen.getByText("Employee updated successfully!")
  ).toBeTruthy();
});
});
