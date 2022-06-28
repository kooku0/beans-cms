/* eslint-disable no-underscore-dangle */
import {
  ChangeEventHandler, useState,
} from 'react';

import useCreateAuthor from '@/hooks/query/useCreateAuthor';
import useFetchAuthors from '@/hooks/query/useFetchAuthors';

function AuthorsPage() {
  const [name, setName] = useState('');
  const { data: authors } = useFetchAuthors();
  const { mutate } = useCreateAuthor();

  const handleClick = () => mutate({ name });

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setName(target.value);
  };

  if (!authors) {
    return <div>loading</div>;
  }

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
