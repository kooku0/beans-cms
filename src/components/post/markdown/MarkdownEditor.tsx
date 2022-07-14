import { ChangeEvent } from 'react';

import styled from '@emotion/styled';
import { FormElement } from '@nextui-org/react';

import MarkdownEditorToolbar from './MarkdownEditorToolbar';

interface Props {
  markdown: string;
  setMarkdown: (markdown: string) => void;
}

function MarkdownEditor({ markdown, setMarkdown }: Props) {
  const handleChange = ({ target }: ChangeEvent<FormElement>) => {
    setMarkdown(target.value);
  };

  return (
    <Wrapper>
      <MarkdownEditorToolbar />
      <Textarea
        aria-label="markdown"
        autoComplete="off"
        value={markdown}
        onChange={handleChange}
      />
    </Wrapper>
  );
}

export default MarkdownEditor;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Textarea = styled.textarea`
  flex-grow: 1;
  background-color: transparent; 
  border-radius: 16px;
  border: none;
  box-shadow: rgb(224, 224, 224) 0 0 0 2px;
  padding: 12px;
  resize: none;

  &:focus-within, &:hover {
    box-shadow: #0072F5 0 0 0 2px;
  }
`;
