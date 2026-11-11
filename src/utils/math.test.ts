import { add } from "./math";

describe("add function", () => {
  test("should add two numbers", () => {
    expect(add(10, 20)).toBe(30);
  });
});
test("should check equality", () => {
  expect(10 + 20).toBe(30);
});

test("should check truthy value", () => {
  expect(true).toBeTruthy();
});

test("should check array contains a value", () => {
  expect(["React", "Jest", "Cypress"]).toContain("Jest");
});
test("should compare objects", () => {
  expect({ name: "Ancy", role: "Developer" }).toEqual({
    name: "Ancy",
    role: "Developer"
  });
});
test("should check null value", () => {
  expect(null).toBeNull();
});

test("should check defined value", () => {
  expect("Jest").toBeDefined();
});