import { act } from 'react-test-renderer';

import { render } from '@testing-library/react';

import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import CreatePage from './create.page';

describe('CreatePage', () => {
  const renderCreatePage = () => render((
    <ReactQueryWrapper>
      <CreatePage />
    </ReactQueryWrapper>
  ));

  it('should render successfully', async () => {
    const { baseElement } = renderCreatePage();

    await act(async () => {
      await expect(baseElement).toBeTruthy();
    });
  });
});
