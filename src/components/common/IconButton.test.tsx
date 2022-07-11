import { mdiPencilOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { render, screen } from '@testing-library/react';

import IconButton from './IconButton';

describe('IconButton', () => {
  const renderIconButton = () => render((
    <IconButton>
      <Icon data-testid="icon" path={mdiPencilOutline} size={1} />
    </IconButton>
  ));

  it('should render', () => {
    renderIconButton();

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
