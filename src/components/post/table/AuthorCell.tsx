import useFetchAuthors from '@/hooks/query/author/useFetchAuthors';

interface Props {
  authorUid: string;
}

function AuthorCell({ authorUid }: Props) {
  const { data: authors } = useFetchAuthors();

  return <div>{authors?.find(({ uid }) => uid === authorUid)?.name}</div>;
}

export default AuthorCell;
