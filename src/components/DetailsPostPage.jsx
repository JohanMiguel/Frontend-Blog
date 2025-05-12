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
      postDetails.comments.push(response.comment);
      setNameUser("");
      setContent("");
    }

    setSubmitting(false);
  };

  if (loading) return <p className="text-center text-secondary">Cargando...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <div className="container py-4">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate("/")}>
        ← Volver
      </button>

      {/* POST DETALLES */}
      <div className="card shadow-sm mb-4">
        <div className="card-header d-flex align-items-center bg-light">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(postDetails?.user || "Usuario")}&background=0D8ABC&color=fff`}
            alt="avatar"
            className="rounded-circle me-3"
            width="48"
            height="48"
          />
          <div>
            <h5 className="mb-0">@{postDetails?.user || "Usuario"}</h5>
          </div>
        </div>
        <div className="card-body">
          <h4 className="text-primary">{postDetails?.title}</h4>
          <p>{postDetails?.content}</p>
        </div>
        <div className="card-footer d-flex justify-content-between small text-muted">
          <span>{new Date(postDetails?.createdAt).toLocaleString()}</span>
          <span className="badge bg-success">{postDetails?.course || "Sin curso"}</span>
        </div>
      </div>

      {/* FORMULARIO DE LOS COMENTARIOS */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-light">
          <h5 className="mb-0">Agregar Comentario</h5>
        </div>
        <div className="card-body">
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
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </div>
      </div>

      {/* LOS COMENTARIOS */}
      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0">Comentarios</h5>
        </div>
        <div className="card-body">
          {postDetails?.comments?.length > 0 ? (
            <ul className="list-group list-group-flush">
              {postDetails.comments.map((comment, index) => (
                <li key={index} className="list-group-item">
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.nameUser || "Usuario")}&background=0D8ABC&color=fff`}
                      alt="avatar"
                      className="rounded-circle me-2"
                      width="40"
                      height="40"
                    />
                    <strong>{comment.nameUser}</strong>
                  </div>
                  <p className="mb-1">{comment.content}</p>
                  <small className="text-muted">{new Date(comment.createdAt).toLocaleString()}</small>
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
