import FIXTURE_POST from '@/fixtures/post';

import { api } from '..';

import {
  CreatePostRequest, CreatePostResponse,
  FetchPostResponse,
  FetchPostsResponse, UpdatePostRequest,
} from './model';
import {
  createPost,
  deletePost, fetchPost, fetchPosts, updatePost,
} from '.';

jest.mock('..');

describe('post API', () => {
  describe('fetchPosts', () => {
    const mockResponseData: FetchPostsResponse = [FIXTURE_POST];

    beforeEach(() => {
      (api as jest.Mock).mockReturnValueOnce({ data: mockResponseData });
    });

    it('GET /posts', async () => {
      const response = await fetchPosts();

      expect(response).toBe(mockResponseData);
      expect(api).toBeCalledWith({
        method: 'get',
        url: '/posts',
      });
    });
  });

  describe('fetchPost', () => {
    const uid = 'mock-uid';
    const mockResponseData: FetchPostResponse = FIXTURE_POST;

    beforeEach(() => {
      (api as jest.Mock).mockReturnValueOnce({ data: mockResponseData });
    });

    it('GET /post/{uid}', async () => {
      const response = await fetchPost(uid);

      expect(response).toBe(mockResponseData);
      expect(api).toBeCalledWith({
        method: 'get',
        url: `/posts/${uid}`,
      });
    });
  });

  describe('postPost', () => {
    const post: CreatePostRequest = {
      authorUid: 'mock-author-uid',
      title: 'asf',
      contents: 'mock-contents',
      status: 'draft',
      tags: ['mock-tag'],
    };
    const mockResponseData: CreatePostResponse = {
      uid: 'mock-id',
    };

    beforeEach(() => {
      (api as jest.Mock).mockReturnValueOnce({ data: mockResponseData });
    });

    it('POST /posts', async () => {
      const response = await createPost(post);

      expect(response).toBe(mockResponseData);
      expect(api).toBeCalledWith({
        method: 'post',
        url: '/posts',
        data: post,
      });
    });
  });

  describe('updatePost', () => {
    const uid = 'mock-uid';
    const post: UpdatePostRequest = {
      contents: 'mock-contents',
    };
    const mockResponseData = null;

    beforeEach(() => {
      (api as jest.Mock).mockReturnValueOnce({ data: mockResponseData });
    });

    it('PATCH /posts/{uid}', async () => {
      const response = await updatePost(uid, post);

      expect(response).toBe(mockResponseData);
      expect(api).toBeCalledWith({
        method: 'patch',
        url: `/posts/${uid}`,
        data: post,
      });
    });
  });

  describe('deletePost', () => {
    const uid = 'mock-uid';
    const mockResponseData = null;

    beforeEach(() => {
      (api as jest.Mock).mockReturnValueOnce({ data: mockResponseData });
    });

    it('DELETE /posts/{uid}', async () => {
      const response = await deletePost(uid);

      expect(response).toBe(mockResponseData);
      expect(api).toBeCalledWith({
        method: 'delete',
        url: `/posts/${uid}`,
      });
    });
  });
});
