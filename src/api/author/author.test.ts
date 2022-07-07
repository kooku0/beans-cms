import FIXTURE_AUTHOR from '@/fixtures/author';

import { api } from '..';

import {
  FetchAuthorResponse,
  FetchAuthorsResponse, PatchAuthorRequest, PostAuthorRequest, PostAuthorResponse,
} from './model';
import {
  deleteAuthor, fetchAuthor, fetchAuthors, patchAuthor, postAuthor,
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

  describe('postAuthor', () => {
    const author: PostAuthorRequest = {
      name: 'mock-name',
    };
    const mockResponseData: PostAuthorResponse = {
      uid: 'mock-id',
    };

    beforeEach(() => {
      (api as jest.Mock).mockReturnValueOnce({ data: mockResponseData });
    });

    it('POST /authors', async () => {
      const response = await postAuthor(author);

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
    const author: PatchAuthorRequest = {
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
