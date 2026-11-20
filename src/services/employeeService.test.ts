
import { describe, it, expect, vi, afterEach } from "vitest";

import {
  getEmployees,
  addEmployeeAPI,
  updateEmployeeAPI,
  deleteEmployeeAPI,
} from "./employeeService";

import type { Employee } from "../features/employees/employeeSlice";

const mockEmployee: Employee = {
  id: 1,
  name: "Ajay",
  email: "ajay@gmail.com",
  phone: "9876543210",
  department: "IT",
  designation: "Developer",
  joiningDate: "2026-01-01",
  status: "Active",
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Employee Service Testing", () => {
  it("should fetch employees successfully", async () => {
    const mockUsers = [
      { id: 1, name: "Ajay", email: "ajay@gmail.com" },
    ];

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockUsers),
      })
    );

    const result = await getEmployees();

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Ajay");
    expect(result[0].department).toBe("IT");
  });

  it("should throw error when fetching employees fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false })
    );

    await expect(getEmployees()).rejects.toThrow(
      "Failed to fetch employees"
    );
  });

  it("should add employee successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockEmployee),
      })
    );

    const result = await addEmployeeAPI(mockEmployee);

    expect(result).toEqual(mockEmployee);
    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("should throw error when adding employee fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false })
    );

    await expect(addEmployeeAPI(mockEmployee)).rejects.toThrow(
      "Failed to add employee"
    );
  });

  it("should update employee successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockEmployee),
      })
    );

    const result = await updateEmployeeAPI(mockEmployee);

    expect(result).toEqual(mockEmployee);
    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users/1",
      expect.objectContaining({ method: "PUT" })
    );
  });

  it("should throw error when updating employee fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false })
    );

    await expect(updateEmployeeAPI(mockEmployee)).rejects.toThrow(
      "Failed to update employee"
    );
  });

  it("should delete employee successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true })
    );

    await expect(deleteEmployeeAPI(1)).resolves.toBeUndefined();

    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users/1",
      { method: "DELETE" }
    );
  });

  it("should throw error when deleting employee fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false })
    );

    await expect(deleteEmployeeAPI(1)).rejects.toThrow(
      "Failed to delete employee"
    );
  });
});
