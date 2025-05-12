
import { useState, useEffect } from "react";
import { getAllPosts, getPostById } from '../../services/api'

// Hook para manejar publicaciones
export const usePost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPosts();
      if (data.error) {
        throw new Error(data.message);
      }
      setPosts(data.posts || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    setPosts,
    loading,
    error,
    fetchAllPosts,
  };
};
