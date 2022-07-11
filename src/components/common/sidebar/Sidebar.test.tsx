import { render } from '@testing-library/react';

import Sidebar from './Sidebar';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    push: jest.fn(),
    pathname: '',
  }),
}));

describe('Sidebar', () => {
  const renderSidebar = () => render((
    <Sidebar
      config={[
        {
          icon: 'icon.png',
          label: 'label',
          items: [{
            text: 'menu1',
            link: '/menu1',
          }],
        },
      ]}
      header={<div>header</div>}
      footer={<div>footer</div>}
    />
  ));

  it('header와 footer가 렌더되어야 한다.', () => {
    const { container } = renderSidebar();

    expect(container).toHaveTextContent('header');
    expect(container).toHaveTextContent('footer');
  });

  it('config에 있는 메뉴들이 렌더되어야 한다.', () => {
    const { container } = renderSidebar();

    expect(container).toHaveTextContent('menu');
  });
});
