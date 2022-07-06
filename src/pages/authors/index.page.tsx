import {
  ChangeEventHandler, useState,
} from 'react';

import { css } from '@emotion/react';
import { Text } from '@nextui-org/react';

import AuthorsTable from '@/components/author/table/AuthorsTable';
import useCreateAuthor from '@/hooks/query/author/useCreateAuthor';
import useFetchAuthors from '@/hooks/query/author/useFetchAuthors';

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
    <div css={css`width: 100%;`}>
      <Text h1>Authors Page</Text>
      <ul>
        {
          authors?.map((author) => (
            <li key={author.uid}>{author.name}</li>
          ))
        }
      </ul>
      <div>
        <label htmlFor="name">name</label>
        <input placeholder="name" id="name" value={name} onChange={handleChangeInput} />
        <button type="button" onClick={handleClick}>등록</button>
      </div>
      <div className="author-table">
        <AuthorsTable authors={authors} />
      </div>
    </div>
  );
}

export default AuthorsPage;
