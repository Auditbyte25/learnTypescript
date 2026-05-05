/* ------------------ Triple-Slash Directives --------------- */
/* Triple-slash directives are single-line comments containing a single XML 
tag. The contents of the comment are used as compiler directives. 
>>Triple-slash directives are only valid at the top of their containing file. 
A triple-slash directive can only be preceded by single or multi-line 
comments, including other triple-slash directives. */

// This `directive` serves as a declaration of dependency between files.
/// <reference path="learn.ts" />

/* This directive declares a dependency on a package.
/// <reference types="..." /> */

/* This directive allows a file to explicitly include an existing 
built -in lib file. */
/// <reference lib="es2017.string" />

/* This directive marks a file as a default library. You will see this 
comment at the top of lib.d.ts and its different variants. */
/* /// <reference no-default-lib="true" /> */


/* By default AMD modules are generated anonymous. This can lead to problems 
when other tools are used to process the resulting modules, such as bundlers 
The amd-module directive allows passing an optional module name to the 
compiler: */
/// <amd-module name="NamedModule" />
export class C { }; 

/* /// <amd-dependency path="x" /> informs the compiler about a non-TS 
module dependency that needs to be injected in the resulting module’s 
require call. */
/// <amd-dependency path="legacy/moduleA" name="moduleA" />

/* Triple-slash directives can be marked with preserve="true" to prevent 
the compiler from removing them from the output. */
/// <reference path="..." preserve="true" />