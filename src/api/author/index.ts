import { ApiResponse } from '@/models/api';

import { api } from '..';

import { FetchAuthorsResponse, PostAuthorRequest, PostAuthorResponse } from './model';

const BASE_URL = '/authors';

export const fetchAuthors = async ():Promise<FetchAuthorsResponse> => {
  const response = await api<ApiResponse<FetchAuthorsResponse>>({
    method: 'get',
    url: BASE_URL,
  });

  return response.data;
};

export const postAuthor = async (author: PostAuthorRequest):Promise<PostAuthorResponse> => {
  const response = await api<ApiResponse<PostAuthorResponse>>({
    method: 'post',
    url: BASE_URL,
    data: author,
  });

  return response.data;
};
