class TrimCommentsInLine {
  line!: string;
  length!: number;
  indexesOfQuotesAndRegexp!: number[][];
  lookForClosed: number;

  constructor() {
    this.lookForClosed = -1;
  }

  init(line: string) {
    this.line = line;
    this.length = line.length;
    this.indexesOfQuotesAndRegexp = this.getQuotesAndRegexpIndexes(
      this.getQuotesIndexes(line),
      this.getRegexpIndexes(line)
    );
  }

  getQuotesIndexes(line: string) {
    const regexQuotes = new RegExp(/(['"`]).*?\1/, 'g');
    const indexes = [];
    let result;
    while ((result = regexQuotes.exec(line))) {
      indexes.push([result.index, regexQuotes.lastIndex - 1]);
    }
    return indexes;
  }

  getRegexpIndexes(line: string) {
    const regexRegexp = new RegExp(
      /(?<=[\s(])\/[^/*].*\/(?=[\s).,;gmisdyuv])/,
      'g'
    );
    const indexes = [];
    let result;
    while ((result = regexRegexp.exec(line))) {
      indexes.push([result.index, regexRegexp.lastIndex - 1]);
    }
    return indexes;
  }

  getQuotesAndRegexpIndexes(
    quotesIndexes: number[][],
    regexpIndexes: number[][]
  ) {
    const regNotInQuotesIndexes = [];
    for (const regIndex of regexpIndexes) {
      const [regStart, regEnd] = regIndex;
      const len = quotesIndexes.length;
      let i = 0;

      while (i < len) {
        const [quoStart, quoEnd] = quotesIndexes[i];
        if (regStart > quoStart && regEnd < quoEnd) {
          break;
        }
        i++;
      }

      if (i === len) {
        regNotInQuotesIndexes.push(regIndex);
      }
    }

    return [...quotesIndexes, ...regNotInQuotesIndexes];
  }

  isNotInQuotesAndRegexp(commentCharIndex: number) {
    for (const [start, end] of this.indexesOfQuotesAndRegexp) {
      if (start < commentCharIndex && end > commentCharIndex) {
        return false;
      }
    }
    return true;
  }

  getDoubleSlashCommentIndex(line: string) {
    const regexDoubleSlash = new RegExp(/\/\//, 'g');
    const comment = [];
    let result;
    while ((result = regexDoubleSlash.exec(line))) {
      const index = result.index;
      if (this.isNotInQuotesAndRegexp(index)) {
        comment.push([index, this.length]);
        break;
      }
    }
    return comment;
  }

  getMultiCommentIndexes(line: string) {
    const regexOpened = new RegExp(/\/\*/, 'g');
    const regexClosed = new RegExp(/\*\//, 'g');
    const comments = [];

    if (this.lookForClosed > -1) {
      const result = regexClosed.exec(line);
      if (result === null) {
        comments.push([0, this.length]);
      } else {
        this.lookForClosed = -1;
        comments.push([0, regexClosed.lastIndex]);
        regexOpened.lastIndex = regexClosed.lastIndex;
        comments.push(
          ...this.getMultiCommentIndexesWithoutLookForClosed(
            line,
            regexOpened,
            regexClosed
          )
        );
      }
    } else {
      comments.push(
        ...this.getMultiCommentIndexesWithoutLookForClosed(
          line,
          regexOpened,
          regexClosed
        )
      );
    }
    return comments;
  }

  getMultiCommentIndexesWithoutLookForClosed(
    line: string,
    regexOpened: RegExp,
    regexClosed: RegExp
  ) {
    const comments = [];
    let result;
    while ((result = regexOpened.exec(line))) {
      const openedIndex = result.index;

      if (this.isNotInQuotesAndRegexp(openedIndex)) {
        regexClosed.lastIndex = regexOpened.lastIndex;
        const result = regexClosed.exec(line);
        if (result === null) {
          this.lookForClosed = openedIndex;
          comments.push([openedIndex, this.length]);
          break;
        } else {
          comments.push([openedIndex, regexClosed.lastIndex]);
          regexOpened.lastIndex = regexClosed.lastIndex;
        }
      }
    }
    return comments;
  }

  mergeDoubleSlashCommentAndMultiComments(
    dsComment: Array<Array<number>>,
    mComments: Array<Array<number>>
  ) {
    if (dsComment.length === 0 && mComments.length === 0) {
      return [];
    }
    if (dsComment.length > 0 && mComments.length === 0) {
      return dsComment;
    }
    if (dsComment.length === 0 && mComments.length > 0) {
      return mComments;
    }

    const [dsIndex] = dsComment[0];
    let merged = mComments
      .flat()
      .concat(dsIndex)
      .sort((a, b) => a - b);

    const dsIndexInMerged = merged.indexOf(dsIndex);
    if (dsIndexInMerged % 2 === 1) {
      return mComments;
    } else {
      if (dsIndex < this.lookForClosed) {
        this.lookForClosed = -1;
      }

      merged = merged.slice(0, dsIndexInMerged + 1).concat(this.length);
      const result = [];
      for (let i = 0; i < merged.length; i += 2) {
        const temp = [];
        for (let j = i; j < i + 2; j++) {
          temp.push(merged[j]);
        }
        result.push(temp);
      }
      return result;
    }
  }

  trim(line: string) {
    this.init(line);

    const dsComment = this.getDoubleSlashCommentIndex(line);
    const mComments = this.getMultiCommentIndexes(line);
    const merged = this.mergeDoubleSlashCommentAndMultiComments(
      dsComment,
      mComments
    );

    if (merged.length === 0) {
      return line;
    }

    let prevEnd = 0;
    let result = '';
    merged.forEach(([start, end]) => {
      result += line.slice(prevEnd, start);
      prevEnd = end;
    });
    result += line.slice(prevEnd, this.length);
    return result;
  }

  reset() {
    this.lookForClosed = -1;
    this.init('');
  }
}

export = TrimCommentsInLine;
