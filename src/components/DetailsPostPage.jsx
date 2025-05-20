import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDetailsPost } from "../shared/hooks/useDetailsPost";
import { addComment } from "../services/api";

export const DetailsPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { postDetails, loading, error } = useDetailsPost(postId);

  const [nameUser, setNameUser] = useState("");
  const [content, setContent] = useState("");
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleAddComment = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!nameUser.trim() || !content.trim()) {
      setFormError("Todos los campos son obligatorios.");
      return;
    }

    setSubmitting(true);

    const commentData = {
      nameUser: nameUser.trim(),
      content: content.trim(),
      post_id: postId,
    };

     const response = await addComment(commentData);
    if (response.error) {
      setFormError(response.message);
    } else {
      postDetails.comments.unshift(response.comment);
      setNameUser("");
      setContent("");
    }

    setSubmitting(false);
  };

  if (loading) return <p className="text-center text-secondary">Cargando...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <div
      className="container py-4"
      style={{
        maxWidth: 650,
        margin: "0 auto",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate("/")}
        style={{ borderRadius: 12, fontWeight: 500 }}
      >
        ← Volver
      </button>

      {/* POST DETALLES */}
      <div
        className="shadow-sm mb-4"
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 2px 16px 0 rgba(60,60,60,0.06)",
          overflow: "hidden",
        }}
      >
        {/* Curso destacado */}
        <div
          style={{
            background: "linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "1.05rem",
            letterSpacing: "0.03em",
            borderRadius: "18px 0 18px 0",
            padding: "0.5rem 1.5rem 0.5rem 1.2rem",
            minWidth: 120,
            display: "inline-block",
          }}
        >
          {postDetails?.course || "Sin curso"}
        </div>
        <div className="d-flex align-items-center" style={{ gap: "1rem", padding: "1.2rem 1.5rem 0 1.5rem" }}>
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(postDetails?.user || "Usuario")}&background=0D8ABC&color=fff`}
            alt="avatar"
            className="rounded-circle"
            width="48"
            height="48"
            style={{ border: "2px solid #eaeaea" }}
          />
          <div>
            <div style={{ fontWeight: 600, fontSize: "1.08rem", color: "#232323" }}>
              {postDetails?.user || "Usuario"}
            </div>
            <div style={{ fontSize: "0.93rem", color: "#b0b0b0" }}>
              @{(postDetails?.user || "Usuario").toLowerCase()}
            </div>
          </div>
        </div>
        <div style={{ padding: "1.2rem 1.5rem 0.5rem 1.5rem" }}>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "1.6rem",
              marginBottom: 8,
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              background: "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {postDetails?.title}
          </h2>
          <p style={{ color: "#444", fontSize: "1.08rem", marginBottom: 0, lineHeight: 1.6 }}>
            {postDetails?.content}
          </p>
        </div>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{
            fontSize: "0.98rem",
            color: "#b0b0b0",
            background: "#f8fafc",
            borderTop: "1px solid #f0f0f0",
            padding: "0.7rem 1.5rem",
          }}
        >
          <span>
            {new Date(postDetails?.createdAt).toLocaleString("es-ES", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
                hour12: true
            })}
          </span>
          <span>
            <span role="img" aria-label="comentarios" style={{ marginRight: 4 }}>
              👁️‍🗨️
            </span>
            {postDetails?.comments?.length || 0} comentarios
          </span>
        </div>
      </div>

      {/* FORMULARIO DE LOS COMENTARIOS */}
      <div
        className="shadow-sm mb-4"
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 16px 0 rgba(60,60,60,0.04)",
        }}
      >
        <div
          className="bg-light"
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: "0.8rem 1.2rem",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <h5 className="mb-0" style={{ fontWeight: 700 }}>Agregar Comentario</h5>
        </div>
        <div className="card-body" style={{ padding: "1.2rem" }}>
          {formError && <div className="alert alert-danger">{formError}</div>}
          <form onSubmit={handleAddComment}>
            <div className="mb-3">
              <label htmlFor="nameUser" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nameUser"
                value={nameUser}
                onChange={(e) => setNameUser(e.target.value)}
                required
                disabled={submitting}
                style={{ borderRadius: 8 }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Comentario</label>
              <textarea
                className="form-control"
                id="content"
                rows="3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                disabled={submitting}
                style={{ borderRadius: 8 }}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitting} style={{ borderRadius: 8 }}>
              {submitting ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </div>
      </div>

      {/* LOS COMENTARIOS */}
      <div
        className="shadow-sm"
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 16px 0 rgba(60,60,60,0.04)",
        }}
      >
        <div
          className="bg-light"
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: "0.8rem 1.2rem",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <h5 className="mb-0" style={{ fontWeight: 700 }}>Comentarios</h5>
        </div>
        <div className="card-body" style={{ padding: "1.2rem" }}>
          {postDetails?.comments?.length > 0 ? (
            <ul className="list-group list-group-flush">
              {postDetails.comments.map((comment, index) => (
                <li
                  key={index}
                  className="list-group-item"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #f0f0f0",
                    padding: "1rem 0",
                  }}
                >
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.nameUser || "Usuario")}&background=0D8ABC&color=fff`}
                      alt="avatar"
                      className="rounded-circle me-2"
                      width="40"
                      height="40"
                      style={{ border: "1px solid #eaeaea" }}
                    />
                    <div>
                      <div style={{ fontWeight: 500, fontSize: "1rem", color: "#232323" }}>
                        {comment.nameUser}
                      </div>
                      <div style={{ fontSize: "0.89rem", color: "#b0b0b0" }}>
                        @{(comment.nameUser || "usuario").toLowerCase()}
                      </div>
                    </div>
                  </div>
                  <p className="mb-1" style={{ color: "#444", fontSize: "1.01rem" }}>{comment.content}</p>
                  <small className="text-muted">
                    {new Date(comment.createdAt).toLocaleString("es-ES", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true
                    })}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted mb-0">No hay comentarios aún.</p>
          )}
        </div>
      </div>
    </div>
  );
};