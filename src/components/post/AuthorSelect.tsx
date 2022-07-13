import { useEffect, useState } from 'react';
import Select, { Options } from 'react-select';

import { useRecoilState } from 'recoil';

import useFetchAuthors from '@/hooks/query/author/useFetchAuthors';
import postFormState from '@/recoil/post/create/atom';

type Option = {
  value: string;
  label: string;
}

function AuthorSelect() {
  const [{ authorUid }, setPostForm] = useRecoilState(postFormState);
  const [options, setOptions] = useState<Options<Option>>([]);
  const { data: authors } = useFetchAuthors();

  useEffect(() => {
    if (authors) {
      const parsedAuthors = authors.map((author) => ({
        value: author.uid,
        label: author.name,
      }));

      setOptions(parsedAuthors);
    }
  }, [authors]);

  const customStyles = {
    control: () => ({
      width: '100%',
      backgroundColor: 'transparent',
      borderRadius: '16px',
      border: 'none',
      display: 'flex',
      height: 52,
      padding: '0 10px',
      boxShadow: 'rgb(224, 224, 224) 0 0 0 2px',
    }),
    indicatorSeparator: () => ({
      visible: 'hidden',
    }),
  };

  const handleChange = (selectedOption: Options<Option>) => {
    setPostForm((prev) => ({ ...prev, authorUid: selectedOption.value }));
  };

  return <Select defaultValue={authorUid} options={options} styles={customStyles} placeholder="Author" onChange={handleChange} />;
}

export default AuthorSelect;
