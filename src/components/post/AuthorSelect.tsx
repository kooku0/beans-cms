import { useEffect, useState } from 'react';
import Select, { Options } from 'react-select';

import useFetchAuthors from '@/hooks/query/author/useFetchAuthors';

function AuthorSelect() {
  const [options, setOptions] = useState<Options<any>>([]);
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
      backgroundColor: '#eee',
      borderRadius: '14px',
      border: 'none',
      display: 'flex',
      height: 52,
    }),
    indicatorSeparator: () => ({
      visible: 'hidden',
    }),
  };

  return <Select options={options} styles={customStyles} placeholder="Author" />;
}

export default AuthorSelect;
