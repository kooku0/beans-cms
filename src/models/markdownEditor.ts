import { ReactElement } from 'react';

export const markdownGrammars = ['h1', 'h2', 'h3', 'h4', 'bold', 'italic', 'underline', 'strikethrough', 'link', 'image'] as const;
export type MarkdownGrammar = typeof markdownGrammars[number];

export type ToolbarItem = {
  type: MarkdownGrammar;
  icon: ReactElement;
};
