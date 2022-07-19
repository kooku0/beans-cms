/* eslint-disable react/jsx-one-expression-per-line */

import { ReactElement } from 'react';

import styled from '@emotion/styled';
import {
  mdiFormatBold, mdiFormatItalic, mdiFormatStrikethrough, mdiFormatUnderline, mdiImage, mdiLink,
} from '@mdi/js';
import Icon from '@mdi/react';

import { MarkdownGrammar } from '@/models/markdownEditor';

interface Props {
  onClickItem: (item: MarkdownGrammar) => void;
}

function MarkdownEditorToolbar({ onClickItem }: Props) {
  const toolbarItems: {
    type: MarkdownGrammar;
    icon: ReactElement;
  }[] = [
    {
      type: 'h1',
      icon: <Heading>H<small>1</small></Heading>,
    },
    {
      type: 'h2',
      icon: <Heading>H<small>2</small></Heading>,
    },
    {
      type: 'h3',
      icon: <Heading>H<small>3</small></Heading>,
    },
    {
      type: 'h4',
      icon: <Heading>H<small>4</small></Heading>,
    },
    {
      type: 'bold',
      icon: <Icon path={mdiFormatBold} size={1} />,
    },
    {
      type: 'italic',
      icon: <Icon path={mdiFormatItalic} size={1} />,
    },
    {
      type: 'underline',
      icon: <Icon path={mdiFormatUnderline} size={1} />,
    },
    {
      type: 'strikethrough',
      icon: <Icon path={mdiFormatStrikethrough} size={1} />,
    },
    {
      type: 'link',
      icon: <Icon path={mdiLink} size={1} />,
    },
    {
      type: 'image',
      icon: <Icon path={mdiImage} size={1} />,
    },
  ];

  return (
    <Wrapper>
      {toolbarItems.map(({ type, icon }) => (
        <ToolbarItem role="button" aria-label={type} key={type} onClick={() => onClickItem(type)}>{icon}</ToolbarItem>
      ))}
    </Wrapper>
  );
}

export default MarkdownEditorToolbar;

const Wrapper = styled.div`
  display: flex;
  padding: 12px;
  border-bottom: 1px solid #e6e6e6;
  align-items: center;
`;

const ToolbarItem = styled.div`
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #777;

  &:hover {
    background-color: #f5f5f5;
    color: #000;
  }
`;

const Heading = styled.div`
  font-weight: bold;
  font-size: 1.3rem;

  small {
    font-weight: inherit;
    font-size: 0.5em;
  }
`;
