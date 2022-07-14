import FIXTURE_AUTHOR from '@/fixtures/author';

import { api } from '..';

import {
  CreateAuthorRequest, CreateAuthorResponse,
  FetchAuthorResponse,
  FetchAuthorsResponse, UpdateAuthorRequest,
} from './model';
import {
  createAuthor,
  deleteAuthor, fetchAuthor, fetchAuthors, patchAuthor,
} from '.';

jest.mock('..');

describe('author API', () => {
  describe('fetchAuthors', () => {
    const mockResponseData: FetchAuthorsResponse = [FIXTURE_AUTHOR];

    beforeEach(() => {
      (api as jest.Mock).mockReturnValueOnce({ data: mockResponseData });
    });

    it('GET /authors', async () => {
      const response = await fetchAuthors();

      expect(response).toBe(mockResponseData);
      expect(api).toBeCalledWith({
        method: 'get',
        url: '/authors',
      });
    });
  });

  describe('fetchAuthor', () => {
    const uid = 'mock-uid';
    const mockResponseData: FetchAuthorResponse = FIXTURE_AUTHOR;

    beforeEach(() => {
      (api as jest.Mock).mockReturnValueOnce({ data: mockResponseData });
    });

    it('GET /author/{uid}', async () => {
      const response = await fetchAuthor(uid);

      expect(response).toBe(mockResponseData);
      expect(api).toBeCalledWith({
        method: 'get',
        url: `/authors/${uid}`,
      });
    });
  });

  describe('createAuthor', () => {
    const author: CreateAuthorRequest = {
      name: 'mock-name',
    };
    const mockResponseData: CreateAuthorResponse = {
      uid: 'mock-id',
    };

    beforeEach(() => {
      (api as jest.Mock).mockReturnValueOnce({ data: mockResponseData });
    });

    it('POST /authors', async () => {
      const response = await createAuthor(author);

      expect(response).toBe(mockResponseData);
      expect(api).toBeCalledWith({
        method: 'post',
        url: '/authors',
        data: author,
      });
    });
  });

  describe('patchAuthor', () => {
    const uid = 'mock-uid';
    const author: UpdateAuthorRequest = {
      name: 'mock-name',
    };
    const mockResponseData = null;

    beforeEach(() => {
      (api as jest.Mock).mockReturnValueOnce({ data: mockResponseData });
    });

    it('PATCH /authors/{uid}', async () => {
      const response = await patchAuthor(uid, author);

      expect(response).toBe(mockResponseData);
      expect(api).toBeCalledWith({
        method: 'patch',
        url: `/authors/${uid}`,
        data: author,
      });
    });
  });

  describe('deleteAuthor', () => {
    const uid = 'mock-uid';
    const mockResponseData = null;

    beforeEach(() => {
      (api as jest.Mock).mockReturnValueOnce({ data: mockResponseData });
    });

    it('DELETE /authors/{uid}', async () => {
      const response = await deleteAuthor(uid);

      expect(response).toBe(mockResponseData);
      expect(api).toBeCalledWith({
        method: 'delete',
        url: `/authors/${uid}`,
      });
    });
  });
});
