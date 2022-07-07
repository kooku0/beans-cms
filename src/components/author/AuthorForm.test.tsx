import {
  act, fireEvent, render, screen,
} from '@testing-library/react';

import AuthorForm from './AuthorForm';

describe('AuthorForm', () => {
  const onSubmit = jest.fn();
  const author = {
    name: 'mock-name',
    email: 'mock-email',
    position: 'mock-position',
    team: 'mock-team',
  };

  const renderAuthorForm = () => render((
    <AuthorForm author={given.author} onSubmit={onSubmit} />
  ));

  context('author이 전달되지 않으면', () => {
    given('author', () => undefined);

    it('submit 버튼 text가 Create 이다.', () => {
      renderAuthorForm();

      expect(screen.getByRole('button')).toHaveTextContent('Create');
    });
  });

  context('author가 전달되면', () => {
    given('author', () => author);

    it('submit 버튼 text가 Update 이다.', async () => {
      renderAuthorForm();

      await act(async () => {
        await expect(screen.getByRole('button')).toHaveTextContent('Update');
      });
    });
  });

  context('submit을 하면', () => {
    given('author', () => author);

    it('onSubmit을 author로 호출한다.', async () => {
      renderAuthorForm();

      await act(async () => {
        await fireEvent.submit(screen.getByRole('button', { name: 'Update' }));
      });

      expect(onSubmit).toBeCalledWith(author);
    });
  });
});
