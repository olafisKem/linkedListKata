import { describe, expect, it } from "@jest/globals";

import {
  push,
  length,
  count,
  emptyList,
  valueAtIndex,
  insertAtIndex,
  find,
} from "./linkedListKata";

// https://www.codewars.com/kata/linked-lists-push-and-buildonetwothree

describe("Linked List Functions", () => {
  describe("push", () => {
    it("should create a single node when the list is empty", () => {
      const list = push(null, 1);
      expect(list.value).toBe(1);
      expect(list.next).toBe(null);
    });

    it("should insert a new node at the front of the list when the list is not empty", () => {
      // setup
      const existingList = push(null, 1);
      // existingList: [{ value: 1 }] -> null

      // action
      const newList = push(existingList, 2);
      // newList: [{ value: 2 }] -> [{ value: 1 }] -> null
      // newList: [{ value: 2 }] -> existingList (i.e. next is existingList)

      // assertions
      expect(newList.value).toBe(2);
      expect(newList.next).toBe(existingList);
    });
  });

  describe("length", () => {
    it("returns 0 for empty lists", () => {
      expect(length(null)).toBe(0);
    });

    it("returns 1 for singleton lists", () => {
      expect(length(push(null, 101))).toBe(1);
    });

    it("returns the length of the list", () => {
      const threeItemList = push(push(push(null, 1), 2), 3);
      expect(length(threeItemList)).toBe(3);
    });
  });

  describe("count", () => {
    it("returns 0 for empty lists", () => {
      expect(count(null, 1)).toBe(0);
    });

    it("counts the items in a singleton list", () => {
      const singletonList = push(null, 1);
      expect(count(singletonList, 1)).toBe(1);
      expect(count(singletonList, 0)).toBe(0);
    });

    it("counts the items in a longer list", () => {
      const threeItemList = push(push(push(null, 5), 5), 2);
      expect(count(threeItemList, 5)).toBe(2);
      expect(count(threeItemList, 2)).toBe(1);
      expect(count(threeItemList, 1)).toBe(0);
    });
  });

  describe("valueAtIndex", () => {
    it("returns null for empty lists", () => {
      // TODO: consider if this should raise an error - yes, throw an error to stop infinite recursion
      expect(() => valueAtIndex(emptyList, 0)).toThrowError(
        /No value at index 0/
      );
    });

    it("returns the value from a singleton list", () => {
      const singletonList = push(emptyList, 123);
      expect(valueAtIndex(singletonList, 0)).toBe(123);
    });

    it("returns the value from a multi item list", () => {
      const twoItemList = push(push(emptyList, 123), 456);
      expect(valueAtIndex(twoItemList, 0)).toBe(456);
      expect(valueAtIndex(twoItemList, 1)).toBe(123);
    });
  });

  describe("insertAtIndex", () => {
    it("inserts a value at the given index", () => {
      const list = push(push(push(null, 10), 5), 2);

      // Insert the value 3 at index 1
      const updatedList = insertAtIndex(list, 3, 99);
      expect(valueAtIndex(updatedList, 0)).toEqual(2);
      expect(valueAtIndex(updatedList, 1)).toEqual(5);
      expect(valueAtIndex(updatedList, 2)).toEqual(10);
      expect(valueAtIndex(updatedList, 3)).toEqual(99);
    });
    it("should throw an error when inserting at an out-of-bounds index", () => {
      const list = push(push(null, 5), 2); // [2] -> [5] (length = 2)

      expect(() => insertAtIndex(list, 3, 10)).toThrowError(
        "Index is out of bounds"
      );
      expect(() => insertAtIndex(list, 4, 10)).toThrowError(
        "Index is out of bounds"
      );
    });
  });

  const isEven = (n: number) => n % 2 === 0;

  describe("find", () => {
    it("finds the first matching element in the list", () => {
      const list = push(push(emptyList, 2), 5); // [5] -> [2] (length = 2)

      expect(find(list, isEven)).toEqual(2);
    });

    it("throws an error otherwise", () => {
      expect(() => find(emptyList, isEven)).toThrowError("No matching element");
    });
  });

  // describe("filter", () => {
  //   it("filters matching elements", () => {
  //     const list = push(push(push(emptyList, 2), 5), 6); // [6] -> [5] -> [2]

  //     const expectedList = push(push(emptyList, 2), 6); // [6] -> [2]
  //     expect(filter(list, isEven)).toEqual(expectedList);
  //   });
  // });
});
