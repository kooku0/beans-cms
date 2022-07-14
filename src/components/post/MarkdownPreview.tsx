import ReactMarkdown from 'react-markdown';

import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import remarkGfm from 'remark-gfm';

import postFormState from '@/recoil/post/form/atom';

function MarkdownPreview() {
  const { markdown, title } = useRecoilValue(postFormState);

  return (
    <Wrapper>
      <Title>{title}</Title>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </Wrapper>
  );
}

export default MarkdownPreview;

const Wrapper = styled.div`
  padding: 1rem;
  height: 100vh;
  overflow: scroll;
`;

const Title = styled.h1`
  font-size: 32px;
  position: sticky;
  top: -1rem;
  padding: 1rem 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
`;
