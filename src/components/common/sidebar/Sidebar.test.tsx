import { render } from '@testing-library/react';

import Sidebar from './Sidebar';

describe('Sidebar', () => {
  const renderSidebar = () => render((
    <Sidebar
      config={given.config}
      header={given.header}
      footer={given.footer}
    />
  ));

  given('config', () => []);

  it('header와 footer가 렌더되어야 한다.', () => {
    given('header', () => <div>header</div>);
    given('footer', () => <div>footer</div>);

    const { container } = renderSidebar();

    expect(container).toHaveTextContent('header');
    expect(container).toHaveTextContent('footer');
  });

  it('config에 있는 메뉴들이 렌더되어야 한다.', () => {
    given('config', () => [
      {
        link: '/link',
        icon: 'icon.png',
        text: '메뉴',
        items: [],
      },
    ]);

    const { container } = renderSidebar();

    expect(container).toHaveTextContent('메뉴');
  });
});
