import { render } from '@testing-library/react';

import FIXTURE_AUTHOR from '@/fixtures/author';

import PositionCell from './PositionCell';

describe('PositionCell', () => {
  const renderPositionCell = () => render((
    <PositionCell position={FIXTURE_AUTHOR.position} team={FIXTURE_AUTHOR.team} />
  ));

  it('position과 team이 렌더되어야 한다.', () => {
    const { container } = renderPositionCell();

    expect(container).toHaveTextContent(FIXTURE_AUTHOR.position as string);
    expect(container).toHaveTextContent(FIXTURE_AUTHOR.team as string);
  });
});
