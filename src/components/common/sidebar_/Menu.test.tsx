import { fireEvent, render, screen } from '@testing-library/react';
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

  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  context('icon이 없으면', () => {
    given('icon', () => undefined);

    it('icon이 보이지 않아야 한다.', () => {
      renderMenu();

      expect(screen.queryByAltText('icon')).toBeNull();
    });
  });

  context('icon이 있으면', () => {
    given('icon', () => 'icon.png');

    it('icon이 보여야 한다.', () => {
      renderMenu();

      expect(screen.getByAltText('icon')).not.toBeNull();
    });
  });

  context('link가 없으면', () => {
    given('link', () => undefined);

    it('메뉴를 클릭했을때 link로 이동하지 않아야한다.', () => {
      renderMenu();

      fireEvent.click(screen.getByText('메뉴'));

      expect(mockPush).not.toBeCalled();
    });
  });

  context('link가 있으면', () => {
    given('link', () => '/link');

    it('메뉴를 클릭했을때 link로 이동해야 한다.', () => {
      renderMenu();

      fireEvent.click(screen.getByText('메뉴'));

      expect(mockPush).toBeCalledWith('/link');
    });
  });

  context('subMenu를 클릭하면', () => {
    given('items', () => [{ text: '서브메뉴', link: '/sub-menu' }]);

    it('link로 이동해야 한다.', () => {
      renderMenu();

      fireEvent.click(screen.getByText('서브메뉴'));

      expect(mockPush).toBeCalledWith('/sub-link');
    });
  });
});
