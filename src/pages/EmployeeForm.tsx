
import { useState } from "react";
import type React from "react";
import type { Employee } from "../features/employees/employeeSlice";

type EmployeeFormProps = {
  initialData?: Employee;
  onSave: (employee: Employee) => void;
  existingEmployees?: Employee[];
};

function EmployeeForm({
  initialData,
  onSave,
  existingEmployees = [],
}: EmployeeFormProps) {
  const [form, setForm] = useState<Employee>(
    initialData ?? {
      id: 0,
      name: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      joiningDate: "",
      status: "Active",
    }
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.department ||
      !form.designation.trim() ||
      !form.joiningDate
    ) {
      setError("Please fill in all required fields.");
      setSuccess("");
      return;
    }

    const email = form.email.trim().toLowerCase();

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setSuccess("");
      return;
    }

    // Duplicate email validation
    const duplicateEmail = existingEmployees.some(
      (employee) =>
        employee.email.trim().toLowerCase() === email &&
        employee.id !== initialData?.id
    );

    if (duplicateEmail) {
      setError("This email address is already registered.");
      setSuccess("");
      return;
    }

    // Indian mobile number validation
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(form.phone.trim())) {
      setError("Please enter a valid 10-digit mobile number.");
      setSuccess("");
      return;
    }

    const employeeData = {
      ...form,
      email,
      phone: form.phone.trim(),
    };

    onSave(employeeData);

    setError("");
    setSuccess(
      initialData
        ? "Employee updated successfully!"
        : "Employee added successfully!"
    );

    if (!initialData) {
      setForm({
        id: 0,
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        joiningDate: "",
        status: "Active",
      });
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "20px auto" }}>
      <h2>{initialData ? "Edit Employee" : "Add Employee"}</h2>

      <form onSubmit={handleSubmit} noValidate>
        <label>Name *</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter employee name"
          style={{ display: "block", width: "100%", marginBottom: 12 }}
        />

        <label>Email *</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
          style={{ display: "block", width: "100%", marginBottom: 12 }}
        />

        <label>Phone Number *</label>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter 10-digit mobile number"
          maxLength={10}
          style={{ display: "block", width: "100%", marginBottom: 12 }}
        />

        <label>Department *</label>
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          style={{ display: "block", width: "100%", marginBottom: 12 }}
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

        <label>Designation *</label>
        <input
          name="designation"
          value={form.designation}
          onChange={handleChange}
          placeholder="Enter designation"
          style={{ display: "block", width: "100%", marginBottom: 12 }}
        />

        <label>Joining Date *</label>
        <input
          name="joiningDate"
          type="date"
          value={form.joiningDate}
          onChange={handleChange}
          style={{ display: "block", width: "100%", marginBottom: 12 }}
        />

        <label>Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={{ display: "block", width: "100%", marginBottom: 12 }}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button type="submit">
          {initialData ? "Update Employee" : "Add Employee"}
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
