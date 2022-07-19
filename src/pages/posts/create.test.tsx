import { act } from 'react-test-renderer';

import { render } from '@testing-library/react';

import InjectTestingRecoil from '@/test/InjectTestingRecoil';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import CreatePage from './create.page';

jest.mock('@/components/post/MarkdownPreview');

describe('PostCreatePage', () => {
  const renderCreatePage = () => render((
    <ReactQueryWrapper>
      <InjectTestingRecoil>
        <CreatePage />
      </InjectTestingRecoil>
    </ReactQueryWrapper>
  ));

  it('should render successfully', async () => {
    const { baseElement } = renderCreatePage();

    await act(async () => {
      await expect(baseElement).toBeTruthy();
    });
  });
});
