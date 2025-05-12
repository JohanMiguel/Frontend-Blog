import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../shared/hooks/usePost";
import { Filtrer } from "./Filtrer";
import { useFiltrerPost } from "../shared/hooks/useFiltrerPost";

export const PostList = () => {
  const { posts, loading, error, fetchAllPosts } = usePost();
  const {
    filteredPosts,
    loading: loadingFiltered,
    error: errorFiltered,
    fetchPostsByCourse,
  } = useFiltrerPost();

  const [activeFilter, setActiveFilter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const handleFilteredPosts = (courseName) => {
    if (!courseName) {
      setActiveFilter(false);
    } else {
      fetchPostsByCourse(courseName);
      setActiveFilter(true);
    }
  };

  const displayedPosts = activeFilter ? filteredPosts : posts;

  const isLoading = loading || loadingFiltered;
  const currentError = error || errorFiltered;

  if (isLoading)
    return <p className="text-center text-secondary">Cargando publicaciones...</p>;
  if (currentError)
    return <p className="text-center text-danger">Error: {currentError}</p>;

    return (
    <div className="container mt-4" style={{ padding: "0 1rem" }}>
      <Filtrer onFilteredPosts={handleFilteredPosts} />
      <div className="d-flex flex-column align-items-center">
        {displayedPosts.map((post) => {
          const username =
            typeof post.user === "object"
              ? post.user?.name
              : post.user || "Desconocido";
  
          const courseName =
            typeof post.course === "object"
              ? post.course?.name
              : post.course || "Curso no encontrado";
  
          const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            username
          )}&background=ff7e6e&color=ffffff&size=64`;
  
          return (
            <div
              key={post._id || post.id}
              className="w-100 mb-4 p-3 border rounded shadow-sm bg-white post-item"
              onClick={() => navigate(`buscar/${post._id || post.id}`)}
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div className="d-flex align-items-center mb-3">
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="rounded-circle me-3"
                  style={{ width: "56px", height: "56px", objectFit: "cover" }}
                />
                <div>
                  <h5 className="mb-0">{username}</h5>
                  <small className="text-muted">@{username.toLowerCase()}</small>
                </div>
              </div>
              <div>
                <h6 className="text-primary fw-semibold">{post.title}</h6>
                <p className="mb-2 text-dark">{post.content}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <small className="text-muted">
                  {new Date(post.createdAt).toLocaleString()}
                </small>
                  <span className="badge bg-success">{courseName}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

};
