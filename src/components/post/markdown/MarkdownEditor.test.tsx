import { fireEvent, render, screen } from '@testing-library/react';

import MarkdownEditor from './MarkdownEditor';

describe('MarkdownEditor', () => {
  const setMarkdown = jest.fn();
  const markdown = 'MarkdownEditor';

  const renderMarkdownEditor = () => render((
    <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
  ));

  afterEach(() => {
    jest.clearAllMocks();
    setMarkdown.mockClear();
  });

  it('should render markdown', () => {
    const { container } = renderMarkdownEditor();

    expect(container).toHaveTextContent(markdown);
  });

  it('when type at textarea, should be called setMarkdown', () => {
    renderMarkdownEditor();

    fireEvent.change(screen.getByLabelText('markdown'), { target: { value: 'Markdown' } });

    expect(setMarkdown).toBeCalledWith('Markdown');
  });

  describe('click toolbar item', () => {
    context('when click h1', () => {
      it('should apply markdown grammar', () => {
        renderMarkdownEditor();

        fireEvent.click(screen.getByRole('button', { name: 'h1' }));

        expect(setMarkdown).toBeCalledWith(`# ${markdown}`);
      });
    });

    context('when click h2', () => {
      it('should apply markdown grammar', () => {
        renderMarkdownEditor();

        fireEvent.click(screen.getByRole('button', { name: 'h2' }));

        expect(setMarkdown).toBeCalledWith(`## ${markdown}`);
      });
    });

    context('when click h3', () => {
      it('should apply markdown grammar', () => {
        renderMarkdownEditor();

        fireEvent.click(screen.getByRole('button', { name: 'h3' }));

        expect(setMarkdown).toBeCalledWith(`### ${markdown}`);
      });
    });

    context('when click h4', () => {
      it('should apply markdown grammar', () => {
        renderMarkdownEditor();

        fireEvent.click(screen.getByRole('button', { name: 'h4' }));

        expect(setMarkdown).toBeCalledWith(`#### ${markdown}`);
      });
    });

    context('when click link', () => {
      it('should apply markdown grammar', () => {
        renderMarkdownEditor();

        const textarea = screen.getByLabelText('markdown') as HTMLTextAreaElement;
        const cursorPosition = markdown.indexOf('Editor');

        textarea.setSelectionRange(cursorPosition, cursorPosition);
        fireEvent.click(screen.getByRole('button', { name: 'link' }));

        expect(setMarkdown).toBeCalledWith('Markdown[link text]()Editor');
      });
    });

    context('when click image', () => {
      it('should apply markdown grammar', () => {
        renderMarkdownEditor();

        const textarea = screen.getByLabelText('markdown') as HTMLTextAreaElement;
        const cursorPosition = markdown.indexOf('Editor');

        textarea.setSelectionRange(cursorPosition, cursorPosition);
        fireEvent.click(screen.getByRole('button', { name: 'image' }));

        expect(setMarkdown).toBeCalledWith('Markdown![image]()Editor');
      });
    });

    context('when click bold', () => {
      it('should apply markdown grammar', () => {
        renderMarkdownEditor();

        const textarea = screen.getByLabelText('markdown') as HTMLTextAreaElement;
        const cursorPosition = markdown.indexOf('Editor');

        textarea.setSelectionRange(cursorPosition, markdown.length);
        fireEvent.click(screen.getByRole('button', { name: 'bold' }));

        expect(setMarkdown).toBeCalledWith('Markdown**Editor**');
      });
    });

    context('when click italic', () => {
      it('should apply markdown grammar', () => {
        renderMarkdownEditor();

        const textarea = screen.getByLabelText('markdown') as HTMLTextAreaElement;
        const cursorPosition = markdown.indexOf('Editor');

        textarea.setSelectionRange(cursorPosition, markdown.length);
        fireEvent.click(screen.getByRole('button', { name: 'italic' }));

        expect(setMarkdown).toBeCalledWith('Markdown*Editor*');
      });
    });

    context('when click strikethrough', () => {
      it('should apply markdown grammar', () => {
        renderMarkdownEditor();

        const textarea = screen.getByLabelText('markdown') as HTMLTextAreaElement;
        const cursorPosition = markdown.indexOf('Editor');

        textarea.setSelectionRange(cursorPosition, markdown.length);
        fireEvent.click(screen.getByRole('button', { name: 'strikethrough' }));

        expect(setMarkdown).toBeCalledWith('Markdown~~Editor~~');
      });
    });
  });
});
