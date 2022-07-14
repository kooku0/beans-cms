import { User } from '@nextui-org/react';

import useFetchAuthors from '@/hooks/query/author/useFetchAuthors';

interface Props {
  authorUid: string;
}

function AuthorCell({ authorUid }: Props) {
  const { data: authors } = useFetchAuthors();

  const author = authors?.find(({ uid }) => uid === authorUid);

  if (!author) {
    return <div>Not Found Author</div>;
  }
  return (
    <User squared src={author.avatar} name={author.name} css={{ p: 0 }}>
      {author.email}
    </User>
  );
}

export default AuthorCell;
