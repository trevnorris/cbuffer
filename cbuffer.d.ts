
// Note that ES6 modules cannot directly export class objects.
// This file should be imported using the CommonJS-style:
//   import x = require('[~THE MODULE~]');
//
// Alternatively, if --allowSyntheticDefaultImports or
// --esModuleInterop is turned on, this file can also be
// imported as a default import:
//   import x from '[~THE MODULE~]';
//
// Refer to the TypeScript documentation at
// https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require
// to understand common workarounds for this limitation of ES6 modules.

/*~ This module is a UMD module that exposes a global variable 'CBuffer' when
 *~ loaded outside a module loader environment.
 */
export as namespace CBuffer;

/*~ This declaration specifies that the class constructor function
 *~ is the exported object from the file
 */
export = CBuffer;

declare class CBuffer<T> {

  constructor(entries: T[]);
  constructor(size: number);

  /* mutator methods */
  /** pop last item */
  pop(): T | undefined;
  /** push item to the end */
  push(...items: T[]): number;
  /** reverse order of the buffer */
  reverse(): this;
  /** rotate buffer to the left by cntr, or by 1 */
  rotateLeft(cntr?: number): this;
  /** rotate buffer to the right by cntr, or by 1 */
  rotateRight(cntr?: number): this;
  /** remove and return first item */
  shift(): T;
  /** sort items */
  sort(sortFunction?: (v1: T, v2: T) => number): this;
  /** add item to beginning of buffer */
  unshift(...items: T[]): number;

  /* accessor methods */
  /** return index of first matched element */
  indexOf(searchElement: T, fromIndex?: number): number;
  /** return last index of the first match */
  lastIndexOf(searchElement: T, fromIndex?: number): number;
  /** return the index an item would be inserted to if this
   *  is a sorted circular buffer
   */
  sortedIndex(value: T, comparitor?: (v1: T, v2: T) => number, thisArg?: any): number;

  /* iteration methods */
  /** check every item in the array against a test */
  every(callbackfn: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
  /** loop through each item in buffer */
  // TODO: figure out how to emulate Array use better
  forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
  /** construct new CBuffer of same length, apply map function, and return new CBuffer */
  map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): CBuffer<U>;
  /** check items agains test until one returns true */
  some(callbackfn: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
  /** calculate the average value of a circular buffer */
  avg(): number;
  /** loop through each item in buffer and calculate sum */
  sum(): number;
  /** loop through each item in buffer and calculate median */
  median(): number;

  /* utility methods */
  /** reset pointers to buffer with zero items
   *  note: this will not remove values in cbuffer, so if for security values
   *        need to be overwritten, run `.fill(null).empty()`
   */
  empty(): this;
  /** fill all places with passed value or function */
  fill(value: T | (() => T)): this;// Array.fill:  fill(value: T, start?: number, end?: number): this;
  /** return first item in buffer */
  first(): T | undefined;
  /** return last item in buffer */
  last(): T | undefined;
  /** return specific index in buffer */
  get(index: number): T | undefined;
  isFull(): boolean;
  /** set value at specified index */
  set(idx: number, arg: T): T;
  /** return clean array of values */
  toArray(): T[];
  /** return a string based on the array */
  join(separator?: string): string;
  /** slice the buffer to an array */
  slice(start?: number, end?: number): T[];
}
