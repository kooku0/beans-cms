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
    const cursorPosition = textAreaRef.current!.selectionStart;

    const [textBeforeCursor, textAfterCursor] = slicedTextBeforeAfterCursor(
      grammar, cursorPosition,
    );

    applyMarkdownGrammar(grammar, textBeforeCursor, textAfterCursor);
  };

  const applyMarkdownGrammar = (grammar: MarkdownGrammar, before: string, after: string) => {
    switch (grammar) {
      case 'h1':
        setMarkdown(`${before}# ${after}`);
        break;
      case 'h2':
        setMarkdown(`${before}## ${after}`);
        break;
      case 'h3':
        setMarkdown(`${before}### ${after}`);
        break;
      case 'h4':
        setMarkdown(`${before}#### ${after}`);
        break;
      case 'link':
        setMarkdown(`${before}[link text]()${after}`);
        break;
      case 'image':
        setMarkdown(`${before}![image]()${after}`);
        break;
      default:
        break;
    }
  };

  const slicedTextBeforeAfterCursor = (grammar: MarkdownGrammar, cursorPosition: number) => {
    const newLineGrammars = ['h1', 'h2', 'h3', 'h4'];
    const rangeGrammars = ['bold', 'italic', 'underline', 'strikethrough'];
    const inlineGrammars = ['link', 'image'];

    if (newLineGrammars.includes(grammar)) {
      const sliced = markdown.slice(0, cursorPosition);
      const lastNewLineIndex = sliced.lastIndexOf('\n');

      const textBeforeCursor = sliced.slice(0, lastNewLineIndex + 1);
      const textAfterCursor = markdown.slice(lastNewLineIndex + 1, markdown.length);

      return [textBeforeCursor, textAfterCursor];
    }

    if (inlineGrammars.includes(grammar)) {
      const textBeforeCursor = markdown.slice(0, cursorPosition);
      const textAfterCursor = markdown.slice(cursorPosition, markdown.length);

      return [textBeforeCursor, textAfterCursor];
    }

    return ['', ''];
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
