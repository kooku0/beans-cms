import { ChangeEvent, useRef } from 'react';

import styled from '@emotion/styled';

import { MarkdownGrammar } from '@/models/markdownEditor';

import MarkdownEditorToolbar from './MarkdownEditorToolbar';

interface Props {
  markdown: string;
  setMarkdown: (markdown: string) => void;
}

function MarkdownEditor({ markdown, setMarkdown }: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeMarkdown = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(target.value);
  };

  const handleClickToolbarItem = (grammar: MarkdownGrammar) => {
    const { selectionStart, selectionEnd } = textAreaRef.current as HTMLTextAreaElement;

    const [textBeforeCursor, textAfterCursor, innerText] = slicedTextBeforeAfterCursor(
      grammar, selectionStart, selectionEnd,
    ) as [string, string, string];

    return applyMarkdownGrammar(textBeforeCursor, textAfterCursor, innerText)[grammar]();
  };

  const applyMarkdownGrammar = (
    before: string, after: string, inner: string) => ({
    h1: () => setMarkdown(`${before}# ${after}`),
    h2: () => setMarkdown(`${before}## ${after}`),
    h3: () => setMarkdown(`${before}### ${after}`),
    h4: () => setMarkdown(`${before}#### ${after}`),
    bold: () => setMarkdown(`${before}**${inner}**${after}`),
    italic: () => setMarkdown(`${before}*${inner}*${after}`),
    strikethrough: () => setMarkdown(`${before}~~${inner}~~${after}`),
    link: () => setMarkdown(`${before}[link text]()${after}`),
    image: () => setMarkdown(`${before}![image]()${after}`),
  });

  const slicedTextBeforeAfterCursor = (
    // eslint-disable-next-line consistent-return
    grammar: MarkdownGrammar, selectionStart: number, selectionEnd: number) => {
    const newLineGrammars = ['h1', 'h2', 'h3', 'h4'];
    const rangeGrammars = ['bold', 'italic', 'underline', 'strikethrough'];
    const inlineGrammars = ['link', 'image'];

    if (newLineGrammars.includes(grammar)) {
      const sliced = markdown.slice(0, selectionStart);
      const lastNewLineIndex = sliced.lastIndexOf('\n');

      const textBeforeCursor = sliced.slice(0, lastNewLineIndex + 1);
      const textAfterCursor = markdown.slice(lastNewLineIndex + 1, markdown.length);

      return [textBeforeCursor, textAfterCursor];
    }

    if (inlineGrammars.includes(grammar)) {
      const textBeforeCursor = markdown.slice(0, selectionStart);
      const textAfterCursor = markdown.slice(selectionStart, markdown.length);

      return [textBeforeCursor, textAfterCursor];
    }

    if (rangeGrammars.includes(grammar)) {
      const textBeforeCursor = markdown.slice(0, selectionStart);
      const textAfterCursor = markdown.slice(selectionEnd, markdown.length);
      const innerText = markdown.slice(selectionStart, selectionEnd);

      return [textBeforeCursor, textAfterCursor, innerText];
    }
  };

  return (
    <Wrapper>
      <MarkdownEditorToolbar onClickItem={handleClickToolbarItem} />
      <TextArea
        ref={textAreaRef}
        aria-label="markdown"
        autoComplete="off"
        value={markdown}
        onChange={handleChangeMarkdown}
      />
    </Wrapper>
  );
}

export default MarkdownEditor;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: transparent; 
  border-radius: 16px;
  border: none;
  box-shadow: rgb(224, 224, 224) 0 0 0 2px;
  overflow: hidden;

  &:focus-within, &:hover {
    box-shadow: #0072F5 0 0 0 2px;
  }
`;

const TextArea = styled.textarea`
  flex-grow: 1;
  padding: 12px;
  resize: none;
  border: none;
`;
