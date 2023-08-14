/// <reference types="node" />
/// <reference types="node" />
import { Transform, TransformCallback } from 'node:stream';
import File from 'vinyl';
declare class TrimComments extends Transform {
    constructor();
    _transform(file: File, _: BufferEncoding, cb: TransformCallback): Promise<void>;
}
export { TrimComments };
