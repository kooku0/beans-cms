import {
  ChangeEventHandler, KeyboardEventHandler, useId, useState,
} from 'react';

import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { debounce } from 'underscore';

import Badge from '@/components/common/Badge';
import postFormState from '@/recoil/post/form/atom';

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
  const handleKeyDownDebounced = debounce(handleKeyDown, 100);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setValue(target.value.replace(',', ''));
  };

  const removeTag = (tag: string) => {
    setPostForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  return (
    <Wrapper>
      {tags.map((tag) => (
        <Badge key={tag} bordered onClick={() => removeTag(tag)}>
          {tag}
        </Badge>
      ))}
      <Input id={id} value={value} aria-label="tags" placeholder="tags" onChange={handleChange} onKeyDown={handleKeyDownDebounced} />
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
  width: 100%;
  background-color: transparent;
  margin: 4px 10px;
`;
