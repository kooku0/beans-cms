import { ChangeEvent } from 'react';

import styled from '@emotion/styled';
import { FormElement } from '@nextui-org/react';

import { MarkdownGrammar } from '@/models/markdownEditor';

import MarkdownEditorToolbar from './MarkdownEditorToolbar';

interface Props {
  markdown: string;
  setMarkdown: (markdown: string) => void;
}

function MarkdownEditor({ markdown, setMarkdown }: Props) {
  const handleChange = ({ target }: ChangeEvent<FormElement>) => {
    setMarkdown(target.value);
  };

  const handleClickToolbarItem = (item: MarkdownGrammar) => {
    switch (item) {
      case 'h1':
        setMarkdown(`${markdown}\n\n# ${markdown}`);
        break;
      case 'h2':
        setMarkdown(`${markdown}\n\n## ${markdown}`);
        break;
      case 'h3':
        setMarkdown(`${markdown}\n\n### ${markdown}`);
        break;
      case 'h4':
        setMarkdown(`${markdown}\n\n#### ${markdown}`);
        break;
      case 'bold':
        setMarkdown(`${markdown}**${markdown}**`);
        break;
      case 'italic':
        setMarkdown(`${markdown}_${markdown}_`);
        break;
      case 'link':
        setMarkdown(`${markdown}[${markdown}](${markdown})`);
        break;
      case 'image':
        setMarkdown(`${markdown}![${markdown}](${markdown})`);
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper>
      <MarkdownEditorToolbar onClickItem={handleClickToolbarItem} />
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
