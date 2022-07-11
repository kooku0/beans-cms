import useFetchAuthors from '@/hooks/query/author/useFetchAuthors';
import { AuthorSchema } from '@/models/author';

import Loader from '../common/Loader';

import AuthorsTable from './table/AuthorsTable';

function Authors() {
  const { data: authors, isLoading } = useFetchAuthors();

  if (isLoading) {
    return <Loader />;
  }

  return <AuthorsTable authors={authors as AuthorSchema[]} />;
}

export default Authors;
