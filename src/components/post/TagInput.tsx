import {
  ChangeEventHandler, KeyboardEventHandler, useId, useState,
} from 'react';

import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import postFormState from '@/recoil/post/create/atom';

import Badge from '../common/Badge';

function TagInput() {
  const [{ tags }, setPostForm] = useRecoilState(postFormState);
  const id = useId();
  const [value, setValue] = useState('');

  const tagIndicators = [',', 'Enter'];

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = ({ key }) => {
    if (value.length > 0 && tagIndicators.includes(key) && !tags.includes(value)) {
      setPostForm((prev) => ({ ...prev, tags: [...prev.tags, value] }));
      setValue('');
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setValue(target.value.replace(',', ''));
  };

  const handleRemoveTag = (tag: string) => {
    setPostForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  return (
    <Wrapper>
      {
        tags.map((tag) => (
          <Badge
            key={tag}
            bordered
            onClick={() => handleRemoveTag(tag)}
          >
            {tag}
          </Badge>
        ))
      }
      <label htmlFor={id} hidden>tags</label>
      <Input id={id} value={value} placeholder="tags" onChange={handleChange} onKeyDown={handleKeyDown} />
    </Wrapper>
  );
}

export default TagInput;

const Wrapper = styled.div`
  width: 100%;
  background-color: transparent; 
  border-radius: 16px;
  border: none;
  box-shadow: rgb(224, 224, 224) 0 0 0 2px;
  padding: 12px;
  display: flex;
  align-items: center;

  &:focus-within, &:hover {
    box-shadow: #0072F5 0 0 0 2px;
  }
`;

const Input = styled.input`
  border: none;
  height: 20px;
  background-color: transparent;
  margin: 4px 10px;
`;
