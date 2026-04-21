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
export { }

/* ----------- Modules in TypeScript ---------- */