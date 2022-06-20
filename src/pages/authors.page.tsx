import { useEffect, useState } from 'react';

import axios, { AxiosResponse } from 'axios';
import { AuthorSchema } from '@/models/author';

function AuthorsPage() {
  const [authors, setAuthors] = useState<AuthorSchema[]>([]);

  useEffect(() => {
    axios.get('/api/authors').then((data: AxiosResponse<AuthorSchema[]>) => {
      setAuthors(data.data);
    });
  }, []);

  return (
    <div>
      <div>Authors page</div>
      <ul>
        {
          authors.map((author) => (
            <li key={author.id}>{author.name}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default AuthorsPage;
