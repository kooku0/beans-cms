import { render } from '@testing-library/react';

import MobileNotSupportedPage from './mobile-not-supported.page';

describe('MobileNotSupportedPage', () => {
  const renderMobileNotSupportedPage = () => render((
    <MobileNotSupportedPage />
  ));

  describe('모바일 브라우저 진입시에 대한 내용이 나타나야만 한다', () => {
    it('"카사에서 투자 시작하기" 버튼이 나타나야만 한다', () => {
      const { container } = renderMobileNotSupportedPage();

      expect(container).toHaveTextContent('카사에서 투자 시작하기');
    });
  });
});
