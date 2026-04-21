/* ----------- Modules ---------- */
/* For focus, the handbook will cover both ES Modules and its 
popular pre-cursor CommonJS module.exports = syntax,
👉 How JavaScript Modules are Defined:
In TypeScript, just as in ECMAScript 2015, any file containing a 
top-level import or export is considered a module.

Conversely, a file without any top-level import or export declarations 
is treated as a script whose contents are available in the global scope

👉 Non-modules
The JavaScript specification declares that any JavaScript files without 
an import declaration, export, or top-level await should be considered 
a script and not a module.

Inside a script file variables and types are declared to be 
in the shared global scope,

If you have a file that doesn’t currently have any imports or exports, 
but you want to be treated as a module, add the line:
*/
export {};

/* ----------- Modules in TypeScript ---------- */
/* 🧠 There are three main things to consider when writing module-based code:
👉 Syntax: What syntax do I want to use to import and export things?
👉 Module Resolution: What is the relationship between module names (or paths) 
and files on disk?
👉 Module Output Target: What should my emitted JavaScript module look like? */

// ES Module Syntax:
// A file can declare a `main export` via export default:
// NOTE:: A code is written in hello.ts file
`export default function helloWorld() {
  console.log("Hello world");
}`;

// This is then imported from `hello.ts` via:
import helloWorld from "./hello";
helloWorld();

/* In addition to the default export, you can have more than one export of 
variables and functions via the `export` by omitting default: */
// NOTE:: THE EXPORT CODE IS IN @filename: maths.ts

// These can be used in another file via the import syntax:
import { pi, phi, absolute } from "./math";
console.log(pi);
const absPhi = absolute(phi);

/* ----------- Additional Import Syntax ---------- */
// An import can be renamed using a format like import {old as new}:
import { pi as π } from "./math";
console.log(π);

// You can mix and match the above syntax into a single import:
import DefaultRandomNumberGenerator, { pi as PI } from "./math";
DefaultRandomNumberGenerator;
console.log(PI);

/* You can take all of the exported objects and put them into a 
single namespace using * as name: */
import * as math from "./math";
console.log(math.pi);
const positivePhi = math.absolute(math.phi);

/* You can import a file and not include any variables into your current 
module via import "./file": 
In this case, the import does nothing. However, all of the code in maths.ts 
was evaluated, which could trigger side-effects which affect other objects. */
import "./math";
console.log("3.14");

/* ----------- TypeScript Specific ES Module Syntax ---------- */
/* Types can be exported and imported using the same syntax 
as JavaScript values: */
