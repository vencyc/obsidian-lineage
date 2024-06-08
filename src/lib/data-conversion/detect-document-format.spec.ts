import { describe, expect, it } from 'vitest';
import { detectDocumentFormat } from 'src/lib/data-conversion/detect-document-format';

describe('detectDocumentFormat', () => {
    it('should return "document" when parseDelimiter matches', () => {
        const text = [
            '---',
            'key: value',
            '---',
            'text',
            '<!--section: 1-->',
            'text',
        ].join('\n');

        const result = detectDocumentFormat(text);

        expect(result).toBe('document');
    });

    it('should return "outline" when bullet points are found', () => {
        const text = ['---', 'key: value', '---', '- item 1', '- item 2'].join(
            '\n',
        );

        const result = detectDocumentFormat(text);

        expect(result).toBe('outline');
    });

    it('should return undefined when no delimiter or bullet points are found', () => {
        const text = ['---', 'key: value', '---', 'This is a line.'].join('\n');

        const result = detectDocumentFormat(text);

        expect(result).toBeUndefined();
    });

    it('should return "outline" when bullet points are mixed with text', () => {
        const text = [
            '---',
            'key: value',
            '---',
            'This is a line.',
            '- item 1',
        ].join('\n');

        const result = detectDocumentFormat(text);

        expect(result).toBe('outline');
    });

    it('should return "document" when both delimiter and bullet points are present, prioritize delimiter', () => {
        const text = [
            '---',
            'key: value',
            '---',
            '- item 1',
            '<!--section: 1-->',
            'text',
        ].join('\n');

        const result = detectDocumentFormat(text);

        expect(result).toBe('document');
    });
});
