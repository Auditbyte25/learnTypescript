# 📌 Scope in TypeScript

## 🧠 Definition

**Scope** =
👉 *Where a variable or function can be accessed in your code*

---

## 🌍 1. Global Scope

👉 Declared outside any function/block → accessible everywhere

### ✅ Example

```ts
let x = 10; // global

function test() {
  console.log(x); // ✅ can access
}

console.log(x); // ✅ can access
```

### 🧠 Meaning

* Declared outside any block or function
* Accessible from anywhere in the file

---

## 🔒 2. Local Scope

👉 Declared inside a function or block → only accessible there

---

## 🔥 Types of Local Scope

### 1. Function Scope

* Variables declared inside a function
* Accessible only within that function

### 2. Block Scope (`let` / `const`)

* Variables declared inside `{ }`
* Accessible only within that block

---

## 🔒 Block Scope (Detailed)

### 🧩 What is a Block?

A block is anything inside `{ }`, such as:

* `if`
* `for`
* `while`
* `{}` itself

---

## 🧠 Core Difference

👉 **Global Scope** = available everywhere
👉 **Block Scope** = available only inside `{ }`

# 📌 Function Scope vs Block Scope

## 🧠 Core Difference

👉 **Function scope** = variable is accessible anywhere inside the function
👉 **Block scope** = variable is accessible only inside `{ }`

---

## 🔵 1. Function Scope

### Uses:

* `var` (and parameters)

### ✅ Example

```ts id="f1"
function test() {
  if (true) {
    var x = 10; // function-scoped
  }

  console.log(x); // ✅ works
}
```

👉 Even though `x` is inside `if`, it is accessible throughout the function

---

## 🔒 2. Block Scope

### Uses:

* `let`
* `const`

### ✅ Example

```ts id="f2"
function test() {
  if (true) {
    let y = 20; // block-scoped
    console.log(y); // ✅ works
  }

  console.log(y); // ❌ ERROR
}
```

👉 `y` exists only inside the `{ }` block

---

## 🔥 Side-by-Side Comparison

```ts id="f3"
function demo() {
  if (true) {
    var a = 1;   // function scope
    let b = 2;   // block scope
    const c = 3; // block scope
  }

  console.log(a); // ✅
  console.log(b); // ❌
  console.log(c); // ❌
}
```
