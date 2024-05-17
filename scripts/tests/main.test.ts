import { expect, describe, it } from "@jest/globals";
import { sum } from "../main";

describe("sum", () => {
  it("adds and returns the sum of two numbers", () => {
    expect(sum(1, 4)).toBe(5);
  });
});
