import { act, render } from '@testing-library/react';

import InjectTestingRecoil from '@/test/InjectTestingRecoil';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import FAQPage from './faq.page';

describe('FAQPage', () => {
  const renderFAQPage = () => render((
    <ReactQueryWrapper>
      <InjectTestingRecoil>
        <FAQPage />
      </InjectTestingRecoil>
    </ReactQueryWrapper>
  ));

  it('"자주 묻는 질문" 타이틀이 나타나야만 한다', async () => {
    const { container } = renderFAQPage();

    await act(() => expect(container).toHaveTextContent('자주 묻는 질문'));
  });
});
