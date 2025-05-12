import { useState, useEffect } from "react";
import { getPostById } from "../../services/api";

export const useDetailsPost = (postId) => {
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return; 
    const fetchPostDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getPostById(postId);
        setPostDetails(data); 
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  return { postDetails, loading, error };
};