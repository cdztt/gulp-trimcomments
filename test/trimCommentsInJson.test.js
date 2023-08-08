"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const node_stream_1 = require("node:stream");
const promises_1 = require("node:stream/promises");
const vinyl_1 = __importDefault(require("vinyl"));
const src_1 = __importDefault(require("../src"));
const expected = `{
  "compilerOptions": {
    "target": "es2021",
    "module": "UMD",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"]
}
`;
let result = '';
function* readable(fileName) {
    const contents = (0, node_fs_1.readFileSync)(node_path_1.default.resolve(__dirname, fileName));
    const file = new vinyl_1.default({ contents });
    yield file;
}
function write(file, _, cb) {
    if (file.contents !== null) {
        result = file.contents.toString();
        cb();
    }
    else {
        cb(new Error('File error'));
    }
}
(0, globals_1.test)('', async () => {
    const writable = new node_stream_1.Writable({ objectMode: true, write });
    await (0, promises_1.pipeline)(readable('test.json'), src_1.default, writable);
    (0, globals_1.expect)(result).toBe(expected);
});
