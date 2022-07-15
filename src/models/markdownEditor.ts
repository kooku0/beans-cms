import { ReactElement } from 'react';

export type MarkdownGrammar =
  | 'h1' | 'h2' | 'h3' | 'h4'
  | 'bold' | 'italic' | 'underline' | 'strikethrough'
  | 'link' | 'image';

export type ToolbarItem = {
  type: MarkdownGrammar;
  icon: ReactElement;
};
