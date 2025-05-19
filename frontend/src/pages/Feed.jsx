import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getPosts, createPost, likePost } from '../services/postService';

function Feed() {
  const { token, user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [newPostMessage, setNewPostMessage] = useState('');

  const cargarPosts = async () => {
    try {
      const data = await getPosts(token);
      setPosts(data);
    } catch (err) {
      console.error('Error al cargar posts:', err);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPostMessage.trim() === '') return;

    try {
      await createPost(token, newPostMessage);
      setNewPostMessage('');
      await cargarPosts();
    } catch (err) {
      console.error('Error al crear post:', err);
    }
  };

  const handleLike = async (postId) => {
    try {
      await likePost(token, postId);
      await cargarPosts();
    } catch (err) {
      console.error('Error al dar like:', err);
    }
  };

  useEffect(() => {
    cargarPosts();
  }, [token]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Feed de publicaciones</h2>

      {/* Formulario para crear publicación */}
      <form onSubmit={handlePostSubmit} style={{ marginBottom: '2rem' }}>
        <textarea
          value={newPostMessage}
          onChange={(e) => setNewPostMessage(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
          rows={3}
          style={{ width: '100%', padding: '1rem' }}
        />
        <button type="submit" style={{ marginTop: '0.5rem' }}>Publicar</button>
      </form>

      {/* Lista de publicaciones */}
      {posts.length === 0 ? (
        <p>No hay publicaciones disponibles.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
            <strong>{post.user?.alias || `Usuario #${post.userId}`}</strong>
            <p>{post.message}</p>
            <small>{new Date(post.createdAt).toLocaleString()}</small>
            <div style={{ marginTop: '0.5rem' }}>
              <button onClick={() => handleLike(post.id)}>❤️ Like</button>
              <span style={{ marginLeft: '0.5rem' }}>Likes: {post.likes?.length ?? 0}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Feed;
