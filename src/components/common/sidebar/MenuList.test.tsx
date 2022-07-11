import { render, screen } from '@testing-library/react';

import MenuList from './MenuList';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    push: jest.fn(),
    pathname: '',
  }),
}));

describe('MenuList', () => {
  const renderMenuList = () => render((
    <MenuList
      icon={given.icon}
      label="label"
      items={[{ text: 'menu', link: '/link' }]}
    />
  ));

  context('icon이 없으면', () => {
    given('icon', () => undefined);

    it('icon이 보이지 않는다.', () => {
      renderMenuList();

      expect(screen.queryByTestId('icon')).toBeNull();
    });
  });

  context('icon이 있으면', () => {
    given('icon', () => 'icon.png');

    it('icon이 보인다.', () => {
      renderMenuList();

      expect(screen.getByTestId('icon')).not.toBeNull();
    });
  });
});
