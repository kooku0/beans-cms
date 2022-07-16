import { ChangeEvent, useRef } from 'react';

import styled from '@emotion/styled';
import { FormElement } from '@nextui-org/react';

import { MarkdownGrammar } from '@/models/markdownEditor';

import MarkdownEditorToolbar from './MarkdownEditorToolbar';

interface Props {
  markdown: string;
  setMarkdown: (markdown: string) => void;
}

function MarkdownEditor({ markdown, setMarkdown }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeMarkdown = ({ target }: ChangeEvent<FormElement>) => {
    setMarkdown(target.value);
  };

  const handleClickToolbarItem = (item: MarkdownGrammar) => {
    const cursorPosition = textareaRef.current?.selectionStart;
    const sliced = markdown.slice(0, cursorPosition);
    const lastNewLineIndex = sliced.lastIndexOf('\n');
    const textBeforCursor = sliced.slice(0, lastNewLineIndex + 1);
    const textAfterCursor = markdown.slice(lastNewLineIndex + 1, markdown.length);
  };

  const applyMarkdownGrammar = (grammar: MarkdownGrammar) => {
    // switch (item) {
    //   case 'h1':
    //     setMarkdown(`${markdown}\n\n# ${markdown}`);
    //     break;
    //   case 'h2':
    //     setMarkdown(`${markdown}\n\n## ${markdown}`);
    //     break;
    //   case 'h3':
    //     setMarkdown(`${markdown}\n\n### ${markdown}`);
    //     break;
    //   case 'h4':
    //     setMarkdown(`${markdown}\n\n#### ${markdown}`);
    //     break;
    //   case 'bold':
    //     setMarkdown(`${markdown}**${markdown}**`);
    //     break;
    //   case 'italic':
    //     setMarkdown(`${markdown}_${markdown}_`);
    //     break;
    //   case 'link':
    //     setMarkdown(`${markdown}[${markdown}](${markdown})`);
    //     break;
    //   case 'image':
    //     setMarkdown(`${markdown}![${markdown}](${markdown})`);
    //     break;
    //   default:
    //     break;
    // }
  };

  return (
    <Wrapper>
      <MarkdownEditorToolbar onClickItem={handleClickToolbarItem} />
      <Textarea
        ref={textareaRef}
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

const Textarea = styled.textarea`
  flex-grow: 1;
  padding: 12px;
  resize: none;
  border: none;
`;
