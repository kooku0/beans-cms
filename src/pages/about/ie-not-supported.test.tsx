import { render } from '@testing-library/react';

import IeNotSupportedPage from './ie-not-supported.page';

describe('IeNotSupportedPage', () => {
  const renderIeNotSupportedPage = () => render((
    <IeNotSupportedPage />
  ));

  describe('IE 미지원 화면이 나타나야만 한다', () => {
    it('"Internet Explorer 브라우저를 지원하지 않습니다." 문구가 나타나야만 한다', () => {
      const { container } = renderIeNotSupportedPage();

      expect(container).toHaveTextContent('Internet Explorer 브라우저를 지원하지 않습니다.');
    });
  });
});
