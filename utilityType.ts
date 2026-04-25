/* ----------- Utility Types ---------- */
/* ----------- Awaited<Type> ---------- */
/* This type is meant to model operations like await in async 
functions, or the .then() method on Promises - specifically, 
the way that they recursively unwrap Promises */
// Example:
type AwaitA = Awaited<Promise<string>>
type AwaitB = Awaited<Promise<Promise<number>>>;
type AwaitC = Awaited<boolean | Promise<number>>;

/* ----------- Partial<Type> ---------- */
// Constructs a type with all properties of Type set to optional. 
interface Todo {
  title: string;
  description: string;
}
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
}
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});

/* ----------- Required<Type> ---------- */
// Constructs a type with all properties of Type set to required.
interface Props {
  a?: number;
  b?: string;
}
const objR1: Props = { a: 5 };
/* ❌ Property 'b' is missing in type '{ a: number; }' but required 
in type 'Required<Props>'. */
// const objR2: Required<Props> = { a: 5 };

/* ----------- Readonly<Type> ---------- */
// Constructs a type with all properties of Type set to readonly
interface Todo2 {
  title: string;
}
const todoReadOnly: Readonly<Todo2> = {
  title: "Delete inactive users",
};
// ❌ Cannot assign to 'title' because it is a read-only property.
// todoReadOnly.title = "Hello";

/* ----------- Record<Keys, Type> ---------- */