import { tpe } from "./tpe-class";

// Default export is an IIFE which runs the default tpe importer, for use with
// type="module" script imports in HTML files
export default (function () { tpe.importer() })()