import { describe, expect, it } from "@jest/globals";
import { greeting } from "./example";

describe("greeting", () => {
  it("returns a greeting", () => {
    expect(greeting("World")).toEqual("Hello, World!");
  });
});
