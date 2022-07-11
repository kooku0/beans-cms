import {
  act, fireEvent, render, screen,
} from '@testing-library/react';

import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import AuthorsPage from './index.page';

jest.mock('@/components/common/sidebar/Sidebar');

describe('AuthorsPage', () => {
  const renderAuthorsPage = () => render(
    <ReactQueryWrapper>
      <AuthorsPage />
    </ReactQueryWrapper>,
  );

  context('Create 버튼을 누르면', () => {
    it('AuthorCreate 페이지로 이동한다.', async () => {
      renderAuthorsPage();

      const button = screen.getByTestId('create-button');

      await act(async () => {
        await fireEvent.click(button);
      });

      expect(button).toHaveAttribute('href', '/authors/create');
    });
  });
});
