import { GetServerSidePropsContext } from 'next';

import { fetchAuthor } from '@/api/author';
import { AuthorSchema } from '@/models/author';

interface Props {
  author: AuthorSchema;
}

function EditPage({ author }: Props) {
  console.log(author);
  return <div>edit-page</div>;
}

type ParsedUrlParams = { uid: string };

export async function getServerSideProps({ params }: GetServerSidePropsContext<ParsedUrlParams>) {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const author = await fetchAuthor(params.uid);

  return { props: { author } };
}

export default EditPage;
