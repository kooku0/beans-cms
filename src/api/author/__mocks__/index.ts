import FIXTURE_AUTHOR from '@/fixtures/author';

export const fetchAuthors = jest.fn(() => [FIXTURE_AUTHOR]);

export const fetchAuthor = jest.fn(() => FIXTURE_AUTHOR);

export const createAuthor = jest.fn(() => ({ uid: '1' }));

export const patchAuthor = jest.fn(() => null);

export const deleteAuthor = jest.fn(() => null);
