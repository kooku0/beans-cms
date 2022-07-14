import { Col, Row } from '@nextui-org/react';

import PostForm from './form/PostForm';
import MarkdownPreview from './MarkdownPreview';
import PostHeader from './PostHeader';

function PostEditor() {
  return (
    <Row>
      <Col>
        <PostHeader />
        <PostForm />
      </Col>
      <Col>
        <MarkdownPreview />
      </Col>
    </Row>
  );
}

export default PostEditor;
