import { useCallback, useMemo } from 'react';
import Select, {
  GroupBase, OptionsOrGroups, SingleValue,
} from 'react-select';

import { useRecoilState } from 'recoil';

import useFetchAuthors from '@/hooks/query/author/useFetchAuthors';
import postFormState from '@/recoil/post/form/atom';

type Option = {
  value: string;
  label: string;
}

function AuthorSelect() {
  const [{ authorUid }, setPostForm] = useRecoilState(postFormState);
  const { data: authors } = useFetchAuthors();

  const options: OptionsOrGroups<Option, GroupBase<Option>> = useMemo(
    () => authors?.map((author) => ({
      value: author.uid,
      label: author.name,
    })) ?? [], [authors]);

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

  const handleChange = useCallback((selectedOption: SingleValue<Option | GroupBase<Option>>) => {
    setPostForm((prev) => ({
      ...prev,
      authorUid: (selectedOption as Option).value,
    }));
  }, []);

  const value = (options as Option[]).find((option) => option.value === authorUid);

  return (
    <Select
      aria-label="author"
      value={value}
      options={options}
      styles={customStyles}
      placeholder="Author"
      onChange={handleChange}
    />
  );
}

export default AuthorSelect;
