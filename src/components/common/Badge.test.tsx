import { render, screen } from '@testing-library/react';

import Badge from './Badge';

describe('Badge', () => {
  const badge = 'badge';
  const defaultBg = '#042F14';
  const defaultColor = '#41EC8B';

  const renderBadge = () => render((
    <Badge bordered={given.bordered} bg={given.bg} color={given.color}>
      {badge}
    </Badge>
  ));

  context('when pass bg and color', () => {
    const bg = '#000';
    const color = '#fff';

    given('bg', () => bg);
    given('color', () => color);

    it('should render with bg and color', () => {
      renderBadge();

      expect(screen.getByText(badge)).toHaveStyle({ backgroundColor: bg });
      expect(screen.getByText(badge)).toHaveStyle({ color });
    });
  });

  context('when bordered is true', () => {
    given('bordered', () => true);

    it('renders with border', () => {
      renderBadge();

      expect(screen.getByText(badge)).toHaveStyle({ border: `1px solid ${defaultColor};` });
    });

    it('backgroundColor is transparent', () => {
      renderBadge();

      expect(screen.getByText(badge)).toHaveStyle({ backgroundColor: 'transparent' });
    });
  });

  context('when bordered is false', () => {
    given('bordered', () => false);

    it('renders with border', () => {
      renderBadge();

      expect(screen.getByText(badge)).toHaveStyle({ border: 'none' });
    });

    it('backgroundColor is bg', () => {
      renderBadge();

      expect(screen.getByText(badge)).toHaveStyle({ backgroundColor: defaultBg });
    });
  });
});
