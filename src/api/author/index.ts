import { ApiResponse } from '@/models/api';

import { api } from '..';

import {
  CreateAuthorRequest,
  CreateAuthorResponse,
  FetchAuthorResponse,
  FetchAuthorsResponse,
  UpdateAuthorRequest,
} from './model';

const BASE_URL = '/authors';

export const fetchAuthors = async ():Promise<FetchAuthorsResponse> => {
  const response = await api<ApiResponse<FetchAuthorsResponse>>({
    method: 'get',
    url: BASE_URL,
  });

  return response.data;
};

export const fetchAuthor = async (uid: string):Promise<FetchAuthorResponse> => {
  const response = await api<ApiResponse<FetchAuthorResponse>>({
    method: 'get',
    url: `${BASE_URL}/${uid}`,
  });

  return response.data;
};

export const createAuthor = async (author: CreateAuthorRequest):Promise<CreateAuthorResponse> => {
  const response = await api<ApiResponse<CreateAuthorResponse>>({
    method: 'post',
    url: BASE_URL,
    data: author,
  });

  return response.data;
};

export const patchAuthor = async (uid: string, author: UpdateAuthorRequest):Promise<void> => {
  const response = await api<ApiResponse<void>>({
    method: 'patch',
    url: `${BASE_URL}/${uid}`,
    data: author,
  });

  return response.data;
};

export const deleteAuthor = async (uid: string):Promise<void> => {
  const response = await api<ApiResponse<void>>({
    method: 'delete',
    url: `${BASE_URL}/${uid}`,
  });

  return response.data;
};
