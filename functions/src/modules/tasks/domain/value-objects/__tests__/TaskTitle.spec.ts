import { TaskTitle } from '../TaskTitle.js';

describe('TaskTitle', () => {
  describe('constructor', () => {
    it('should create a valid title', () => {
      const title = new TaskTitle('Valid Task Title');
      expect(title.value).toBe('Valid Task Title');
    });

    it('should accept titles with minimum length of 3 characters', () => {
      const title = new TaskTitle('abc');
      expect(title.value).toBe('abc');
    });

    it('should accept titles with maximum length of 100 characters', () => {
      const longTitle = 'a'.repeat(100);
      const title = new TaskTitle(longTitle);
      expect(title.value).toBe(longTitle);
    });

    it('should throw error if title is empty', () => {
      expect(() => new TaskTitle('')).toThrow(
        'Task: [title] property is required'
      );
    });

    it('should throw error if title is less than 3 characters', () => {
      expect(() => new TaskTitle('ab')).toThrow(
        'Task: [title] must be between 3 and 100 characters long'
      );
    });

    it('should throw error if title exceeds 100 characters', () => {
      const longTitle = 'a'.repeat(101);
      expect(() => new TaskTitle(longTitle)).toThrow(
        'Task: [title] must be between 3 and 100 characters long'
      );
    });

    it('should throw error if title is not a string', () => {
      expect(() => new TaskTitle(123 as unknown as string)).toThrow(
        'Task: [title] property must be a string'
      );
    });

    it('should throw error if title is only whitespace', () => {
      expect(() => new TaskTitle('   ')).toThrow(
        'Task: [title] must be between 3 and 100 characters long'
      );
    });
  });
});
