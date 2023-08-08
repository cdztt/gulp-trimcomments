declare class TrimCommentsInLine {
    private line;
    private length;
    private indexes;
    private lookForClosed;
    constructor();
    init(line: string): void;
    getQuotesIndexes(line: string): number[];
    isNotBetweenQuotes(quotesIndexes: number[], charIndex: number): boolean;
    getDoubleSlashCommentIndex(line: string): number[][];
    getMultiCommentIndexes(line: string): number[][];
    getMultiCommentIndexesWithoutLookForClosed(line: string, regexOpened: RegExp, regexClosed: RegExp): number[][];
    mergeDoubleSlashCommentAndMultiComments(dsComment: Array<Array<number>>, mComments: Array<Array<number>>): number[][];
    trim(line: string): string;
    reset(): void;
}
export default TrimCommentsInLine;
