/* CONDITIONAL TYPE
   Conditional types help describe the relation between the types of inputs and outputs.
   
   never represents:
   ....something that cannot happen
   ....a function that never returns
   ....a value that should be impossible, 
   EXAMPLES::
   .....function a(): void {}   // returns nothing (but finishes)
   .....function b(): never {}  // never finishes at all */

interface Animal {
  live(): void;
}

interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
type Example2 = RegExp extends Animal ? number : string;

/* Conditional types take a form that looks a little like conditional expressions...
(condition ? trueExpression : falseExpression) in JavaScript:
 SomeType extends OtherType ? TrueType : FalseType; */

/* The power of conditional types comes from using them with GENERICS.
...For example, let’s take the following createLabel function: */

interface IdLabel {
  id: number;
}

interface NameLabel {
  name: string;
}
/* These overloads for createLabel describe a single JavaScript 
function that makes a choice based on the types of its inputs.
...(1) If a library has to make the same sort of choice over and over throughout its API, this becomes cumbersome.
...(2) We have to create three overloads: one for each case when we’re sure of the type,
(one for string and one for number), and one for the most general case (taking a string | number). */

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}

// Instead, we can encode that logic in a conditional type:
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
// We can then use that conditional type to simplify our overloads down to a single function with no overloads.
function createLabels<T extends number | string>(arg: T): NameOrId<T> {
  throw "unimplemented";
}

let a = createLabels("typescript");
let b = createLabels(2.8);
let c = createLabels(Math.random() ? "hello" : 23);

/* ----------------- Conditional Type Constraints ---------------- */
/* For example, let’s take the following:: ---NOTE::Typescript will return error---
...In this example, TypeScript errors because T isn’t known to have a property called message. */
// type MessageOf<T> = T["message"];

// SOLUTION:: We could constrain T, and TypeScript would no longer complain
// type MessageOf<T extends { message: unknown }> = T["message"];
type MessageOf<T extends {message: unknown}> = T["message"];

interface Email {
  message: string;
}

type EmailMessageContent = MessageOf<Email>;

/* However, what if we wanted MessageOf to take any type, and default to something 
...like never if a message property isn’t available? We can do this by moving the 
...constraint out and introducing a conditional type: */
type MessageOfs<T> = T extends { message: unknown } ? T["message"] : never;

interface NewEmail {
  message: string;
}

interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOfs<NewEmail>;
type DogMessageContents = MessageOfs<Dog>;

/* we could also write a type called Flatten that flattens array types to their 
...element types, but leaves them alone otherwise: */

type Flatten<T> = T extends any[] ? T[number] : T;

// Extracts out the element type.
type Str = Flatten<string[]>;
// Leaves the type alone.
type Num = Flatten<number>;

/* ----------------- Inferring Within Conditional Types ---------------- 
...Conditional types provide us with a way to infer from types we compare against 
in the true branch using the infer keyword. 
...For example, we could have inferred the element type in Flatten instead of 
fetching it out “manually” with an indexed access type:*/

type Flattens<Type> = Type extends Array<infer Item> ? Item : Type;

/* We can write some useful helper type aliases using the infer keyword. 
For example, for simple cases, we can extract the return type out from function types: */
type GetReturnType<Type> = Type extends (...arg: never[]) => infer Return ? Return : never;

type NumType = GetReturnType<() => number>;
type StrType = GetReturnType<(x: string) => string>;
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;

/* When inferring from a type with multiple call signatures 
(such as the type of an overloaded function), inferences are made from the last signature */

declare function stringOrNum(x: string): string;
declare function stringOrNum(x: number): number;
declare function stringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof stringOrNum>;

/* ----------------- Distributive Conditional Types ---------------- 
...When conditional types act on a generic type, they become distributive 
when given a union type. For example, take the following: */

type ToArray<Type> = Type extends any ? Type[] : never;

/* If we plug a union type into ToArray, then the conditional 
...type will be applied to each member of that union.
What happens here is that ToArray distributes on:
...string | number;
and maps over each member type of the union, to what is effectively:
...ToArray<string> | ToArray<number>;
which leaves us with:
...string[] | number[];
*/
type StrArrOrNumArr = ToArray<string | number>;

/* Typically, distributivity is the desired behavior. To avoid that behavior, 
you can surround each side of the extends keyword with square brackets. */
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

// 'ArrOfStrOrNum' is no longer a union.
type ArrOfStrOrNum = ToArrayNonDist<string | number>;