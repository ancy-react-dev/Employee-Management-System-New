
import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";

import employeeReducer, {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  fetchEmployees,
  addEmployeeAsync,
  updateEmployeeAsync,
  deleteEmployeeAsync,
  type Employee,
} from "./employeeSlice";

import {
  getEmployees,
  addEmployeeAPI,
  updateEmployeeAPI,
  deleteEmployeeAPI,
} from "../../services/employeeService";

vi.mock("../../services/employeeService", () => ({
  getEmployees: vi.fn(),
  addEmployeeAPI: vi.fn(),
  updateEmployeeAPI: vi.fn(),
  deleteEmployeeAPI: vi.fn(),
}));

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

const createStore = () =>
  configureStore({
    reducer: employeeReducer,
    preloadedState: {
      employees: [mockEmployee],
      loading: false,
      error: null,
    },
  });

describe("Employee Slice Testing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should add an employee", () => {
    const state = employeeReducer(
      undefined,
      addEmployee(mockEmployee)
    );

    expect(state.employees).toContainEqual(mockEmployee);
  });

  it("should update an employee", () => {
    const updatedEmployee = {
      ...mockEmployee,
      name: "Anand",
    };

    const state = employeeReducer(
      {
        employees: [mockEmployee],
        loading: false,
        error: null,
      },
      updateEmployee(updatedEmployee)
    );

    expect(state.employees[0].name).toBe("Anand");
  });

  it("should delete an employee", () => {
    const state = employeeReducer(
      {
        employees: [mockEmployee],
        loading: false,
        error: null,
      },
      deleteEmployee(1)
    );

    expect(state.employees).toHaveLength(0);
  });

  it("should set loading when fetching employees", () => {
    const state = employeeReducer(
      undefined,
      fetchEmployees.pending("", undefined)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("should set error when fetching fails", () => {
    const state = employeeReducer(
      undefined,
      fetchEmployees.rejected(
        new Error("Fetch failed"),
        ""
      )
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Fetch failed");
  });

  it("should fetch employees successfully", async () => {
    vi.mocked(getEmployees).mockResolvedValue([mockEmployee]);

    const store = createStore();
    await store.dispatch(fetchEmployees());

    expect(getEmployees).toHaveBeenCalled();
    expect(store.getState().loading).toBe(false);
  });

  it("should add an employee asynchronously", async () => {
   vi.mocked(addEmployeeAPI).mockResolvedValue(mockEmployee);

    const store = createStore();
    await store.dispatch(addEmployeeAsync(mockEmployee));

    expect(store.getState().employees).toHaveLength(2);
  });

  it("should update an employee asynchronously", async () => {
    vi.mocked(updateEmployeeAPI).mockResolvedValue(mockEmployee);
    const store = createStore();

    await store.dispatch(
      updateEmployeeAsync({
        ...mockEmployee,
        name: "Anand",
      })
    );

    expect(store.getState().employees[0].name).toBe("Anand");
  });

  it("should delete an employee asynchronously", async () => {
    vi.mocked(deleteEmployeeAPI).mockResolvedValue(undefined);

    const store = createStore();
    await store.dispatch(deleteEmployeeAsync(1));

    expect(store.getState().employees).toHaveLength(0);
  });

  it("should not update employee when ID does not exist", () => {
    const store = createStore();

    const updatedEmployee = {
      ...mockEmployee,
      id: 999,
      name: "New Ajay",
    };

    store.dispatch(updateEmployee(updatedEmployee));

    expect(store.getState().employees).toEqual([
      mockEmployee,
    ]);
  });

  it("should not update employee asynchronously when ID does not exist", async () => {
    vi.mocked(updateEmployeeAPI).mockResolvedValue(mockEmployee);
    const store = createStore();

    await store.dispatch(
      updateEmployeeAsync({
        ...mockEmployee,
        id: 999,
        name: "New Ajay",
      })
    );

    expect(store.getState().employees).toEqual([
      mockEmployee,
    ]);
  });

  it("should add employee even when API fails", async () => {
    vi.mocked(addEmployeeAPI).mockRejectedValue(
      new Error("API failed")
    );

    const store = createStore();
    await store.dispatch(addEmployeeAsync(mockEmployee));

    expect(store.getState().employees).toHaveLength(2);
  });

  it("should update employee even when API fails", async () => {
    vi.mocked(updateEmployeeAPI).mockRejectedValue(
      new Error("API failed")
    );

    const store = createStore();

    await store.dispatch(
      updateEmployeeAsync({
        ...mockEmployee,
        name: "Anand",
      })
    );

    expect(store.getState().employees[0].name).toBe("Anand");
  });

  it("should delete employee even when API fails", async () => {
    vi.mocked(deleteEmployeeAPI).mockRejectedValue(
      new Error("API failed")
    );

    const store = createStore();

    await store.dispatch(deleteEmployeeAsync(1));

    expect(store.getState().employees).toHaveLength(0);
  });

 
});
