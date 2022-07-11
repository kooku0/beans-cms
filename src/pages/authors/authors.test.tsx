import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import { useRouter } from 'next/router';

import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import AuthorsPage from './index.page';

jest.mock('@/components/common/sidebar/Sidebar');
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe('AuthorsPage', () => {
  const mockPush = jest.fn();

  const renderAuthorsPage = () => render(
    <ReactQueryWrapper>
      <AuthorsPage />
    </ReactQueryWrapper>,
  );

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({ push: mockPush }));
  });

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
