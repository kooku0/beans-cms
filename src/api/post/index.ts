import { ApiResponse } from '@/models/api';

import { api } from '..';

import {
  CreatePostRequest,
  CreatePostResponse,
  FetchPostResponse,
  FetchPostsResponse,
  PatchPostRequest,
} from './model';

const BASE_URL = '/posts';

export const fetchPosts = async ():Promise<FetchPostsResponse> => {
  const response = await api<ApiResponse<FetchPostsResponse>>({
    method: 'get',
    url: BASE_URL,
  });

  return response.data;
};

export const fetchPost = async (uid: string):Promise<FetchPostResponse> => {
  const response = await api<ApiResponse<FetchPostResponse>>({
    method: 'get',
    url: `${BASE_URL}/${uid}`,
  });

  return response.data;
};

export const createPost = async (post: CreatePostRequest):Promise<CreatePostResponse> => {
  const response = await api<ApiResponse<CreatePostResponse>>({
    method: 'post',
    url: BASE_URL,
    data: post,
  });

  return response.data;
};

export const patchPost = async (uid: string, post: PatchPostRequest):Promise<void> => {
  const response = await api<ApiResponse<void>>({
    method: 'patch',
    url: `${BASE_URL}/${uid}`,
    data: post,
  });

  return response.data;
};

export const deletePost = async (uid: string):Promise<void> => {
  const response = await api<ApiResponse<void>>({
    method: 'delete',
    url: `${BASE_URL}/${uid}`,
  });

  return response.data;
};
