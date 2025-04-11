// Goal:
// 1. Represent a collection of numbers
// 2. Perform operations on that collection (e.g. add, count, transform, find, etc.)
// We will implement our collection as a linked list.

export type EmptyList = null;

export type NonEmptyList = {
  value: number;
  next: List;
};

export type List = EmptyList | NonEmptyList;

export const emptyList = null;

const xs = [1, 2];
const ys = new Array(1, 2);

export const push = (head: List, value: number): NonEmptyList => {
  return { value, next: head };
};

export const length = (list: List): number => {
  if (list === null) {
    return 0;
  }
  return 1 + length(list.next);
};

// My note about recursion (make it stick!): the name of function is 'count' and this is what is being used recursively . see line 36. See also length above and valueAtIndex below. see how each function is being used inside itself
export const count = (list: List, value: number): number => {
  if (list === null) {
    return 0;
  }
  return (list.value === value ? 1 : 0) + count(list.next, value);
};

export const valueAtIndex = (list: List, index: number): number => {
  if (list === null) {
    throw new Error(`No value at index ${index}`);
  }
  if (index < 0) {
    throw new Error(`Invalid index: ${index}`);
  }
  return index === 0 ? list.value : valueAtIndex(list.next, index - 1); // so if there's index at 0 it means theres a first value. otherwise if not null and , not less than zero then go to next value using the same function that finds the value in the first place but decrease the index
  // next part is to retrieve the next value at index using recursion i.e how to use the function valueAtIndex within valueAtIndex
  // visual: { value: 10, next: { value: 20, next: { value: 30, next: null } } }
};

export const insertAtIndex = (
  list: List,
  index: number,
  value: number
): List => {
  if (index < 0) {
    throw new Error(`Invalid index: ${index}`);
  }

  // If inserting at the start (index 0), return a new node with `value` pointing to the original list
  if (index === 0) {
    return { value, next: list };
  }

  if (list === null) {
    // if you get to null and haven't reached the index, the value is too large
    throw new Error(`Index is out of bounds`);
  }

  return {
    value: list.value,
    next: insertAtIndex(list.next, index - 1, value), // Recursively find the correct index
  };
};

//Go through the list and give me the first value that isEven(value) returns true for.
export const find = (
  list: List,
  helperFunction: (element: number) => boolean
): number => {
  if (list === null) {
    throw new Error("No matching element");
  }

  // Check if the current node matches the condition
  if (helperFunction(list.value)) {
    return list.value;
  }

  // Recursively search the rest of the list
  return find(list.next, helperFunction);
};
