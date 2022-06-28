import mockAxios from 'axios';
import qs from 'qs';

import ApiException from '@/exceptions/ApiException';
import { ApiRequestConfig, ApiResponse } from '@/models/api';

import { api, paramsSerializer } from '.';

jest.mock('axios');

const mockResponse: ApiResponse<string> = {
  data: 'mockData',
};

describe('paramsSerializer', () => {
  it('"qs.stringify"를 호출해야만 한다', () => {
    const qsSpyOn = jest.spyOn(qs, 'stringify');
    const params = {
      param1: 'apple',
      param2: 'banana',
      param3: 'orange',
    };

    const result = paramsSerializer(params);

    expect(result).toBe('param1=apple&param2=banana&param3=orange');
    expect(qsSpyOn).toBeCalledWith(params, {
      indices: false,
    });

    qsSpyOn.mockRestore();
  });
});

describe('api', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (mockAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);
  });

  const mockAxiosRequestConfig = (url: string, params?: string): ApiRequestConfig => ({
    url,
    method: 'get',
    params,
  });

  it('api가 호출되야만 한다', async () => {
    const response = await api<ApiResponse<string>>(mockAxiosRequestConfig('/test/test', 'test'));

    expect(response).toBe(mockResponse.data);
    expect(mockAxios).toBeCalledTimes(1);
  });

  describe('api error에 맞는 Exception을 던져야 한다.', () => {
    context('api error가 발생하면', () => {
      const apiRejectResponse = {
        response: {
          status: 403,
          data: 'something error',
        },
      };

      beforeEach(() => {
        jest.clearAllMocks();

        (mockAxios as unknown as jest.Mock).mockRejectedValue(apiRejectResponse);
      });

      it('ApiException이 던져져야 한다.', async () => {
        const throwErrorApiResponse = () => api<ApiResponse<string>>(mockAxiosRequestConfig('/test/test', 'test'));

        const { status, data } = apiRejectResponse.response;
        const apiException = new ApiException(status, data);

        await expect(throwErrorApiResponse).rejects.toThrow(apiException);
      });
    });

    context('발생한 에러가 api error가 아니라면', () => {
      beforeEach(() => {
        jest.clearAllMocks();

        (mockAxios as unknown as jest.Mock).mockRejectedValue(new Error('error'));
      });

      it('reject된 에러를 그대로 던져져야 한다.', async () => {
        const throwErrorApiResponse = () => api<ApiResponse<string>>(mockAxiosRequestConfig('/test/test', 'test'));

        await expect(throwErrorApiResponse).rejects.toThrow('error');
      });
    });
  });
});
