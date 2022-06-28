import ApiException from './ApiException';

describe('ApiException', () => {
  it('errorMessage와 HTTPStatusCode로 인스턴스가 생성되어야 한다.', () => {
    const message = 'something-error';
    const error = new ApiException(403, message);

    expect(error.message).toBe(message);
    expect(error.name).toBe('ApiError');
    expect(error.statusCode).toBe(403);
  });
});
