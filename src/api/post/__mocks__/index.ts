import FIXTURE_POST from '@/fixtures/post';

export const fetchPosts = jest.fn(() => [FIXTURE_POST]);

export const fetchPost = jest.fn(() => FIXTURE_POST);

export const createPost = jest.fn(() => ({ uid: '1' }));

export const updatePost = jest.fn(() => null);

export const deletePost = jest.fn(() => null);
