import FIXTURE_AUTHOR from '@/fixtures/author';

import { api } from '..';

import {
  FetchAuthorResponse,
  FetchAuthorsResponse, PostAuthorRequest, PostAuthorResponse,
} from './model';
import { fetchAuthor, fetchAuthors, postAuthor } from '.';

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
});
