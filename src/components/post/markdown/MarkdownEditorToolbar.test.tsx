import { fireEvent, render, screen } from '@testing-library/react';

import { markdownGrammars } from '@/models/markdownEditor';

import MarkdownEditorToolbar from './MarkdownEditorToolbar';

describe('MarkdownEditorToolbar', () => {
  const onClickItem = jest.fn();

  const renderMarkdownEditorToolbar = () => render((
    <MarkdownEditorToolbar onClickItem={onClickItem} />
  ));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be render markdown grammar items', () => {
    renderMarkdownEditorToolbar();

    markdownGrammars.forEach((grammar) => {
      fireEvent.click(screen.getByRole('button', { name: grammar }));

      expect(onClickItem).toHaveBeenCalledWith(grammar);
    });
  });
});
