import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeForm from "./EmployeeForm";

describe("EmployeeForm RTL Testing", () => {
  test("should display Add Employee heading", () => {
    render(<EmployeeForm onSave={vi.fn()} />);

    expect(
      screen.getByRole("heading", { name: "Add Employee" })
    ).toBeInTheDocument();
  });

  test("should display input fields", () => {
    render(<EmployeeForm onSave={vi.fn()} />);

    expect(
      screen.getByPlaceholderText("Enter employee name")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter email")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter designation")
    ).toBeInTheDocument();
  });

  test("should display department options", () => {
    render(<EmployeeForm onSave={vi.fn()} />);

    expect(screen.getByText("Select Department")).toBeInTheDocument();
    expect(screen.getByText("IT")).toBeInTheDocument();
    expect(screen.getByText("HR")).toBeInTheDocument();
  });

  test("should show error for empty form", () => {
    render(<EmployeeForm onSave={vi.fn()} />);

    fireEvent.click(
      screen.getByRole("button", { name: "Add Employee" })
    );

    expect(
      screen.getByText("Please fill in all required fields.")
    ).toBeInTheDocument();
  });

  test("should show error for invalid email", () => {
    render(<EmployeeForm onSave={vi.fn()} />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter employee name"),
      { target: { value: "Ancy" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter email"),
      { target: { value: "ancy123" } }
    );
fireEvent.change(
  screen.getByPlaceholderText("Enter 10-digit mobile number"),
  { target: { value: "9876543210" } }
);
    fireEvent.change(
      screen.getAllByRole("combobox")[0],
      { target: { value: "IT" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter designation"),
      { target: { value: "Developer" } }
    );

    fireEvent.change(
      document.querySelector('input[name="joiningDate"]')!,
      { target: { value: "2026-11-09" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Add Employee" })
    );

    expect(
      screen.getByText("Please enter a valid email address.")
    ).toBeInTheDocument();
  });

  test("should submit valid employee details", () => {
    const onSave = vi.fn();

    render(<EmployeeForm onSave={onSave} />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter employee name"),
      { target: { value: "Ancy" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter email"),
      { target: { value: "ancy@gmail.com" } }
    );
fireEvent.change(
  screen.getByPlaceholderText("Enter 10-digit mobile number"),
  { target: { value: "9876543210" } }
);
    fireEvent.change(
      screen.getAllByRole("combobox")[0],
      { target: { value: "IT" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter designation"),
      { target: { value: "Developer" } }
    );

    fireEvent.change(
      document.querySelector('input[name="joiningDate"]')!,
      { target: { value: "2026-11-09" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Add Employee" })
    );

    expect(onSave).toHaveBeenCalledWith({
      id: 0,
      name: "Ancy",
      email: "ancy@gmail.com",
      phone: "9876543210",
      department: "IT",
      designation: "Developer",
      joiningDate: "2026-11-09",
      status: "Active",
    });
  });

  test("should display success message", () => {
    render(<EmployeeForm onSave={vi.fn()} />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter employee name"),
      { target: { value: "Ancy" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter email"),
      { target: { value: "ancy@gmail.com" } }
    );
fireEvent.change(
  screen.getByPlaceholderText("Enter 10-digit mobile number"),
  { target: { value: "9876543210" } }
);
    fireEvent.change(
      screen.getAllByRole("combobox")[0],
      { target: { value: "IT" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter designation"),
      { target: { value: "Developer" } }
    );

    fireEvent.change(
      document.querySelector('input[name="joiningDate"]')!,
      { target: { value: "2026-11-09" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Add Employee" })
    );

    expect(
      screen.getByText("Employee added successfully!")
    ).toBeInTheDocument();
  });

  test("should reset form after successful submission", () => {
    render(<EmployeeForm onSave={vi.fn()} />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter employee name"),
      { target: { value: "Ancy" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter email"),
      { target: { value: "ancy@gmail.com" } }
    );
fireEvent.change(
  screen.getByPlaceholderText("Enter 10-digit mobile number"),
  { target: { value: "9876543210" } }
);
    fireEvent.change(
      screen.getAllByRole("combobox")[0],
      { target: { value: "IT" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter designation"),
      { target: { value: "Developer" } }
    );

    fireEvent.change(
      document.querySelector('input[name="joiningDate"]')!,
      { target: { value: "2026-11-09" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Add Employee" })
    );

    expect(
      screen.getByPlaceholderText("Enter employee name")
    ).toHaveValue("");
  });
});
