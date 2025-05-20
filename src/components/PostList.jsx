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
    <div
      className="container mt-4"
      style={{
        padding: "0 0.5rem",
        maxWidth: 600,
        margin: "0 auto",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <Filtrer onFilteredPosts={handleFilteredPosts} />
      <div className="d-flex flex-column align-items-center" style={{ gap: "1.2rem" }}>
        {displayedPosts.map((post) => {
          const username =
            typeof post.user === "object"
              ? post.user?.name
              : post.user || "Desconocido";
          const courseName =
            typeof post.course === "object"
              ? post.course?.name
              : post.course || "Curso no encontrado";
          const avatarUrl =
            "https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?semt=ais_hybrid&w=740";

          return (
            <div
              key={post._id || post.id}
              className="post-item"
              onClick={() => navigate(`buscar/${post._id || post.id}`)}
              style={{
                width: "100%",
                background: "#fff",
                borderRadius: "16px",
                padding: "1.1rem 1.2rem 1.3rem 1.2rem",
                boxShadow: "0 2px 16px 0 rgba(60,60,60,0.06)",
                cursor: "pointer",
                border: "none",
                transition: "box-shadow 0.18s, transform 0.18s, scale 0.18s",
                minHeight: 110,
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 8px 32px 0 rgba(60,60,60,0.13)";
                e.currentTarget.style.transform = "scale(1.025)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 2px 16px 0 rgba(60,60,60,0.06)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {/* Destacar el curso */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  background: "linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.98rem",
                  letterSpacing: "0.03em",
                  borderRadius: "16px 0 18px 0",
                  padding: "0.38rem 1.2rem 0.38rem 1.1rem",
                  boxShadow: "0 2px 8px 0 rgba(60,60,60,0.06)",
                  zIndex: 2,
                  minWidth: 120,
                  display: "inline-block",
                }}
              >
                {courseName}
              </div>
              {/* Usuario y avatar */}
              <div className="d-flex align-items-center" style={{ gap: "0.7rem", marginBottom: 10, marginTop: 30 }}>
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="rounded-circle"
                  style={{
                    width: "36px",
                    height: "36px",
                    objectFit: "cover",
                    border: "1px solid #ececec",
                  }}
                />
                <div>
                  <div style={{ fontWeight: 500, fontSize: "1rem", color: "#232323" }}>{username}</div>
                  <div style={{ fontSize: "0.89rem", color: "#b0b0b0" }}>
                    @{username.toLowerCase()}
                  </div>
                </div>
              </div>
              {/* Título destacado */}
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  color: "#22223b",
                  marginBottom: 6,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                  background: "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {post.title}
              </div>
              {/* Contenido */}
              <div style={{ color: "#444", fontSize: "1.01rem", marginBottom: 0, lineHeight: 1.5 }}>
                {post.content}
              </div>
              {/* Acciones visuales */}
              <div
                className="d-flex align-items-center"
                style={{
                  gap: "1.5rem",
                  marginTop: 18,
                  marginBottom: 4,
                  userSelect: "none",
                }}
              >
                {/* Like */}
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    color: "#2563eb",
                    fontSize: "1.25rem",
                    transition: "transform 0.1s",
                  }}
                  title="Me gusta"
                  onClick={e => e.stopPropagation()}
                >
                  <span role="img" aria-label="like">❤️</span>
                </button>
                {/* Repost */}
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    color: "#60a5fa",
                    fontSize: "1.25rem",
                    transition: "transform 0.1s",
                  }}
                  title="Repostear"
                  onClick={e => e.stopPropagation()}
                >
                  <span role="img" aria-label="repost">🔃</span>
                </button>
                {/* Guardar */}
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    color: "#f59e42",
                    fontSize: "1.25rem",
                    transition: "transform 0.1s",
                  }}
                  title="Guardar"
                  onClick={e => e.stopPropagation()}
                >
                  <span role="img" aria-label="guardar">🔖</span>
                </button>
                {/* Compartir */}
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    color: "#10b981",
                    fontSize: "1.25rem",
                    transition: "transform 0.1s",
                  }}
                  title="Compartir"
                  onClick={e => e.stopPropagation()}
                >
                  <span role="img" aria-label="compartir">🔗</span>
                </button>
                {/* Más opciones */}
           
              </div>
               <div
                className="d-flex justify-content-end align-items-center"
                style={{
                  fontSize: "0.93rem",
                  color: "#b0b0b0",
                  marginTop: 0,
                }}
              >
                <span>
                  {new Date(post.createdAt).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true, 
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};