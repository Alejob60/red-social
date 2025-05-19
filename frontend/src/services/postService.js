import axios from 'axios';

export const getPosts = async (token) => {
  const response = await axios.get('http://localhost:3002/posts', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createPost = async (token, message) => {
  const response = await axios.post(
    'http://localhost:3002/posts',
    { message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const likePost = async (token, postId) => {
  const response = await axios.post(
    `http://localhost:3002/posts/${postId}/like`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
