import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';

import { Editor as ToastEditor } from '@toast-ui/react-editor';
import { useRef } from 'react';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import Prism from 'prismjs';

const Editor = () => {
  const editorRef = useRef<ToastEditor>(null);

  const handleClick = () => {
    const html = editorRef.current?.getInstance().getHTML();

    console.log(html);
  };
  return (
    <>
      <ToastEditor
        ref={editorRef}
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }], tableMergedCell]}
      />
      <button onClick={handleClick}>Click!</button>
    </>
  )
};

export default Editor;
