import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import MenuItem from './MenuItem';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe('MenuItem', () => {
  const text = 'menu';
  const link = '/link';
  const mockPush = jest.fn();

  const renderMenuItem = () => render((
    <MenuItem
      icon={given.icon}
      text={text}
      link={link}
    />
  ));

  (useRouter as jest.Mock).mockImplementation(() => ({ push: mockPush, pathname: given.pathname }));

  given('pathname', () => '/');

  context('icon이 없으면', () => {
    given('icon', () => undefined);

    it('icon이 보이지 않는다.', () => {
      renderMenuItem();

      expect(screen.queryByTestId('icon')).toBeNull();
    });
  });

  context('icon이 있으면', () => {
    given('icon', () => 'icon.png');

    it('icon이 보인다.', () => {
      renderMenuItem();

      expect(screen.getByTestId('icon')).not.toBeNull();
    });
  });

  it('메뉴를 클릭하면 link로 이동한다.', () => {
    renderMenuItem();

    expect(screen.getByTestId('link')).toHaveAttribute('href', link);
  });

  context('현재 path와 menu의 link가 일치하면', () => {
    given('pathname', () => link);
    given('icon', () => 'icon.png');

    it('font-weight가 bold이다.', () => {
      renderMenuItem();

      expect(screen.getByRole('listitem')).toHaveStyle({ fontWeight: 'bold' });
    });

    it('icon의 색상이 #333 이다.', () => {
      renderMenuItem();

      // eslint-disable-next-line testing-library/no-node-access
      expect(screen.getByTestId('icon').children.item(0)).toHaveStyle({ fill: '#333' });
    });
  });

  context('현재 path와 menu의 link가 일치하지 않으면', () => {
    given('pathname', () => '/link-mock');
    given('icon', () => 'icon.png');

    it('font-weight가 normal이다.', () => {
      renderMenuItem();

      expect(screen.getByRole('listitem')).toHaveStyle({ fontWeight: 'normal' });
    });

    it('icon의 색상이 #9a9a9a 이다.', () => {
      renderMenuItem();

      // eslint-disable-next-line testing-library/no-node-access
      expect(screen.getByTestId('icon').children.item(0)).toHaveStyle({ fill: '#9a9a9a' });
    });
  });
});
