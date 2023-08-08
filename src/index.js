"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_stream_1 = require("node:stream");
const prettier_1 = __importDefault(require("prettier"));
const TrimCommentsInLine_1 = __importDefault(require("./TrimCommentsInLine"));
function* readLineByLine(text) {
    const regexEol = new RegExp(/\r?\n/, 'g');
    let result;
    let prevLastIndex;
    while (((prevLastIndex = regexEol.lastIndex), (result = regexEol.exec(text)))) {
        yield text.slice(prevLastIndex, result.index);
    }
    yield text.slice(prevLastIndex);
}
async function transform(file, _, cb) {
    try {
        if (file.contents !== null) {
            const text = file.contents.toString();
            const trimmer = new TrimCommentsInLine_1.default();
            let trimmed = '';
            [...readLineByLine(text)].forEach((line) => {
                trimmed += trimmer.trim(line);
            });
            trimmed = await prettier_1.default.format(trimmed, { parser: 'json' });
            file.contents = Buffer.from(trimmed);
        }
        cb(null, file);
    }
    catch (err) {
        cb(err);
    }
}
const inst = new node_stream_1.Transform({ objectMode: true, transform });
exports.default = inst;
//# sourceMappingURL=index.js.map