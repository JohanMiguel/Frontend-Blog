import { useState } from "react";
import { getPostsByCourseName } from "../../services/api";

export const useFiltrerPost = () => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPostsByCourse = async (courseName) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPostsByCourseName(courseName);
      if (data.error) {
        throw new Error(data.message);
      }
      setFilteredPosts(data.posts || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    filteredPosts,
    loading,
    error,
    fetchPostsByCourse,
  };
};