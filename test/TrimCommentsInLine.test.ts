import { expect, test } from '@jest/globals';
import TrimCommentsInLine from '../src/TrimCommentsInLine';

test('', () => {
  const trimmer = new TrimCommentsInLine();
  expect(trimmer.trim('"//"abc')).toBe('"//"abc');
  trimmer.reset();
  expect(trimmer.trim('"//"a//bc')).toBe('"//"a');
  trimmer.reset();
  expect(trimmer.trim('"//"a//b"c"')).toBe('"//"a');
  trimmer.reset();
  expect(trimmer.trim('"//"a"//b"c"')).toBe('"//"a"//b"c"');
});

test('', () => {
  const trimmer = new TrimCommentsInLine();
  expect(trimmer.trim('"/*"abc')).toBe('"/*"abc');
  trimmer.reset();
  expect(trimmer.trim('"/*"a/*bc')).toBe('"/*"a');
  trimmer.reset();
  expect(trimmer.trim('"/*"a/*b"c"')).toBe('"/*"a');
  trimmer.reset();
  expect(trimmer.trim('"/*"a"/*b"c"')).toBe('"/*"a"/*b"c"');
});

test('', () => {
  const trimmer = new TrimCommentsInLine();
  expect(trimmer.trim('"/*"abc*/')).toBe('"/*"abc*/');
  trimmer.reset();
  expect(trimmer.trim('"/*"a/*b*/c')).toBe('"/*"ac');
  trimmer.reset();
  expect(trimmer.trim('"/*"a/*b"c*/"')).toBe('"/*"a"');
  trimmer.reset();
  expect(trimmer.trim('"/*"a"/*b"c"*/d')).toBe('"/*"a"/*b"c"*/d');
});

test('', () => {
  const trimmer = new TrimCommentsInLine();
  expect(trimmer.trim('"/*"a"/*b"c"/*d')).toBe('"/*"a"/*b"c"');
  trimmer.reset();
  expect(trimmer.trim('"/*"a"/*b"c"*/d')).toBe('"/*"a"/*b"c"*/d');
  trimmer.reset();
  expect(trimmer.trim('"/*"a"/*b"c"/*d')).toBe('"/*"a"/*b"c"');
  expect(trimmer.trim('"/*"a"/*b"c"*/d')).toBe('d');
});

test('', () => {
  const trimmer = new TrimCommentsInLine();
  expect(trimmer.trim('"/*"a"/*b"//c"/*d')).toBe('"/*"a"/*b"');
  expect(trimmer.trim('"/*"a/*"b"c"//d')).toBe('"/*"a');
  expect(trimmer.trim('"/*"a"*/b"c"//d/*')).toBe('b"c"');
  expect(trimmer.trim('"/*"a"*/b"c"//d')).toBe('"/*"a"*/b"c"');
});
