import { render } from '@testing-library/react';

import SignInErrorNonePage from './none.page';

describe('SignInErrorNonePage', () => {
  const renderSignInErrorNonePage = () => render((
    <SignInErrorNonePage />
  ));

  it('"가입한 이력이 없어요."문구가 나타나야만 한다', () => {
    const { container } = renderSignInErrorNonePage();

    expect(container).toHaveTextContent('가입한 이력이 없어요.');
  });
});
