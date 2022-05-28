import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  const renderApp = () => render(<App />);

  context('rendering', () => {
    it('hello가 보여야 한다.', ()=> {
      const { container } = renderApp();
      
      expect(container).toHaveTextContent('hello');
    })
  })
});
