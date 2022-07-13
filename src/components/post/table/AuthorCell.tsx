import useFetchAuthors from '@/hooks/query/author/useFetchAuthors';

interface Props {
  authorUid: string;
}

function AuthorCell({ authorUid }: Props) {
  const { data: authors } = useFetchAuthors();

  return <div>{authors?.find(({ uid }) => uid === authorUid)?.name || 'Not Found Author'}</div>;
}

export default AuthorCell;
