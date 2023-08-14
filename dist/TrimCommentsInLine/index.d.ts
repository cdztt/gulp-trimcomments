declare class TrimCommentsInLine {
    line: string;
    length: number;
    indexesOfQuotesAndRegexp: number[][];
    lookForClosed: number;
    constructor();
    init(line: string): void;
    getQuotesIndexes(line: string): number[][];
    getRegexpIndexes(line: string): number[][];
    getQuotesAndRegexpIndexes(quotesIndexes: number[][], regexpIndexes: number[][]): number[][];
    isNotInQuotesAndRegexp(commentCharIndex: number): boolean;
    getDoubleSlashCommentIndex(line: string): number[][];
    getMultiCommentIndexes(line: string): number[][];
    getMultiCommentIndexesWithoutLookForClosed(line: string, regexOpened: RegExp, regexClosed: RegExp): number[][];
    mergeDoubleSlashCommentAndMultiComments(dsComment: Array<Array<number>>, mComments: Array<Array<number>>): number[][];
    trim(line: string): string;
    reset(): void;
}
export = TrimCommentsInLine;
