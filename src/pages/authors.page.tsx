/* eslint-disable no-underscore-dangle */
import {
  ChangeEventHandler, useEffect, useState,
} from 'react';

import axios, { AxiosResponse } from 'axios';

import { AuthorSchema } from '@/models/author';

function AuthorsPage() {
  const [name, setName] = useState('');
  const [authors, setAuthors] = useState<AuthorSchema[]>([]);

  useEffect(() => {
    axios.get('/api/authors').then(({ data }: AxiosResponse<AuthorSchema[]>) => {
      setAuthors(data);
    });
  }, []);

  const handleClick = () => axios.post('/api/authors', { name });

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setName(target.value);
  };

  return (
    <div>
      <div>Authors page</div>
      <ul>
        {
          authors.map((author) => (
            <li key={author._id}>{author.name}</li>
          ))
        }
      </ul>
      <div>
        <label htmlFor="name">name</label>
        <input placeholder="name" id="name" value={name} onChange={handleChangeInput} />
        <button type="button" onClick={handleClick}>등록</button>
      </div>
    </div>
  );
}

export default AuthorsPage;
