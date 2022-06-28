import axios from 'axios';
import qs from 'qs';

import ApiException from '@/exceptions/ApiException';
import { ApiRequestConfig, BaseHeaders } from '@/models/api';

export const paramsSerializer = (params: any): string => qs.stringify(params, { indices: false });

export const baseHeaders: BaseHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function api<T>(config: ApiRequestConfig): Promise<T> {
  const headers = { ...baseHeaders, ...config.headers };

  const url = `${process.env.NEXT_PUBLIC_API_HOST}${config.url}`;

  try {
    const { data } = await axios({
      ...config,
      headers,
      url,
      paramsSerializer,
    });

    return data;
  } catch (error: any) {
    if (error.response) {
      const { data, status } = error.response;

      throw new ApiException(status, data);
    }

    throw error;
  }
}
