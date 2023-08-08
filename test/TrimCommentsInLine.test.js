"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const TrimCommentsInLine_1 = __importDefault(require("../src/TrimCommentsInLine"));
(0, globals_1.test)('', () => {
    const trimmer = new TrimCommentsInLine_1.default();
    (0, globals_1.expect)(trimmer.trim('"//"abc')).toBe('"//"abc');
    trimmer.reset();
    (0, globals_1.expect)(trimmer.trim('"//"a//bc')).toBe('"//"a');
    trimmer.reset();
    (0, globals_1.expect)(trimmer.trim('"//"a//b"c"')).toBe('"//"a');
    trimmer.reset();
    (0, globals_1.expect)(trimmer.trim('"//"a"//b"c"')).toBe('"//"a"//b"c"');
});
(0, globals_1.test)('', () => {
    const trimmer = new TrimCommentsInLine_1.default();
    (0, globals_1.expect)(trimmer.trim('"/*"abc')).toBe('"/*"abc');
    trimmer.reset();
    (0, globals_1.expect)(trimmer.trim('"/*"a/*bc')).toBe('"/*"a');
    trimmer.reset();
    (0, globals_1.expect)(trimmer.trim('"/*"a/*b"c"')).toBe('"/*"a');
    trimmer.reset();
    (0, globals_1.expect)(trimmer.trim('"/*"a"/*b"c"')).toBe('"/*"a"/*b"c"');
});
(0, globals_1.test)('', () => {
    const trimmer = new TrimCommentsInLine_1.default();
    (0, globals_1.expect)(trimmer.trim('"/*"abc*/')).toBe('"/*"abc*/');
    trimmer.reset();
    (0, globals_1.expect)(trimmer.trim('"/*"a/*b*/c')).toBe('"/*"ac');
    trimmer.reset();
    (0, globals_1.expect)(trimmer.trim('"/*"a/*b"c*/"')).toBe('"/*"a"');
    trimmer.reset();
    (0, globals_1.expect)(trimmer.trim('"/*"a"/*b"c"*/d')).toBe('"/*"a"/*b"c"*/d');
});
(0, globals_1.test)('', () => {
    const trimmer = new TrimCommentsInLine_1.default();
    (0, globals_1.expect)(trimmer.trim('"/*"a"/*b"c"/*d')).toBe('"/*"a"/*b"c"');
    trimmer.reset();
    (0, globals_1.expect)(trimmer.trim('"/*"a"/*b"c"*/d')).toBe('"/*"a"/*b"c"*/d');
    trimmer.reset();
    (0, globals_1.expect)(trimmer.trim('"/*"a"/*b"c"/*d')).toBe('"/*"a"/*b"c"');
    (0, globals_1.expect)(trimmer.trim('"/*"a"/*b"c"*/d')).toBe('d');
});
(0, globals_1.test)('', () => {
    const trimmer = new TrimCommentsInLine_1.default();
    (0, globals_1.expect)(trimmer.trim('"/*"a"/*b"//c"/*d')).toBe('"/*"a"/*b"');
    (0, globals_1.expect)(trimmer.trim('"/*"a/*"b"c"//d')).toBe('"/*"a');
    (0, globals_1.expect)(trimmer.trim('"/*"a"*/b"c"//d/*')).toBe('b"c"');
    (0, globals_1.expect)(trimmer.trim('"/*"a"*/b"c"//d')).toBe('"/*"a"*/b"c"');
});
