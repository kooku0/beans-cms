import { useRef } from 'react';

import axios from 'axios';

import Layout from '@/components/common/Layout';

function HomePage() {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const image = fileInput.current!.files![0];

    uploadImage(image);
  };

  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    const response = await axios({
      method: 'POST',
      url: '/api/images',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });

    console.log(response);
  };

  return (
    <Layout title="Home">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input ref={fileInput} type="file" accept="image/png, image/jpeg" />
        <button type="submit">upload</button>
      </form>
    </Layout>
  );
}

export default HomePage;
