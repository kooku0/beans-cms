import {
  fireEvent, render, screen,
} from '@testing-library/react';
import { useRouter } from 'next/router';

import Menu from './Menu';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe('Menu', () => {
  const TEXT = '메뉴';
  const mockPush = jest.fn();

  const renderMenu = () => render((
    <Menu
      icon={given.icon}
      link={given.link}
      text={TEXT}
      items={given.items}
    />
  ));

  (useRouter as jest.Mock).mockImplementation(() => ({ push: mockPush, pathname: given.pathname }));

  given('link', () => '/link');
  given('pathname', () => '/');

  context('icon이 없으면', () => {
    given('icon', () => undefined);

    it('icon이 보이지 않는다.', () => {
      renderMenu();

      expect(screen.queryByAltText('icon')).toBeNull();
    });
  });

  context('icon이 있으면', () => {
    given('icon', () => 'icon.png');

    it('icon이 보인다.', () => {
      renderMenu();

      expect(screen.getByAltText('icon')).not.toBeNull();
    });
  });

  context('link가 없으면', () => {
    given('link', () => undefined);

    it('메뉴를 클릭했을때 link로 이동하지 않는다.', () => {
      renderMenu();

      fireEvent.click(screen.getByText('메뉴'));

      expect(mockPush).not.toBeCalled();
    });
  });

  context('link가 있으면', () => {
    given('link', () => '/link');

    it('메뉴를 클릭했을때 link로 이동한다.', () => {
      renderMenu();

      fireEvent.click(screen.getByText('메뉴'));

      expect(mockPush).toBeCalledWith('/link');
    });
  });

  context('subMenu를 클릭하면', () => {
    given('items', () => [{ text: '서브메뉴', link: '/sub-link' }]);

    it('link로 이동한다.', () => {
      renderMenu();

      fireEvent.click(screen.getByText('서브메뉴'));

      expect(mockPush).toBeCalledWith('/sub-link');
    });
  });

  context('현재 path와 menu의 link가 일치하면', () => {
    given('pathname', () => '/link/sub-link');
    given('items', () => [{ text: '서브메뉴', link: '/sub-link' }]);

    it('메뉴가 열려야 한다.', () => {
      renderMenu();

      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });
  });

  context('현재 path와 menu의 link가 일치하지 않으면', () => {
    given('pathname', () => '/mock/sub-mock');
    given('items', () => [{ text: '서브메뉴', link: '/sub-link' }]);

    it('메뉴가 닫혀있어야 한다.', () => {
      renderMenu();

      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
