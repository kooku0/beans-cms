import { render } from '@testing-library/react';

import Layout from './Layout';

jest.mock('@/components/common/sidebar/Sidebar');

describe('Layout', () => {
  const renderLayout = () => render((
    <Layout title="title" left={<div>left</div>} right={<div>right</div>} />
  ));

  it('should render correctly', () => {
    const { container } = renderLayout();

    expect(container).toHaveTextContent('title');
  });
});
