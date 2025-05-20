import React, { useState } from "react";
import { useFiltrerPost } from "../shared/hooks/useFiltrerPost";

export const Filtrer = ({ onFilteredPosts }) => {
  const [search, setSearch] = useState("");
  const { fetchPostsByCourse, loading, error } = useFiltrerPost();

  const handleSearch = async () => {
    if (search.trim()) {
      await fetchPostsByCourse(search);
      onFilteredPosts(search);
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center mb-4"
      style={{
        width: "100%",
        maxWidth: 500,
        margin: "0 auto",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px 0 rgba(60,60,60,0.06)",
        padding: "1.2rem 1.5rem",
      }}
    >
      <div className="input-group" style={{ width: "100%" }}>
        <input
          type="text"
          className="form-control text-center"
          placeholder="🔍 Buscar por curso: Taller, Tecnología, Práctica Supervisada..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            borderRadius: "8px 0 0 8px",
            borderRight: "none",
            fontSize: "1.05rem",
            padding: "0.7rem 1rem",
            boxShadow: "none",
          }}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
        />
        <button
          className="btn btn-primary"
          onClick={handleSearch}
          disabled={loading}
          style={{
            borderRadius: "0 8px 8px 0",
            fontWeight: 600,
            fontSize: "1.05rem",
            padding: "0.7rem 1.2rem",
            boxShadow: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Buscando...
            </>
          ) : (
            <>
              <span role="img" aria-label="buscar">🔍</span> Buscar
            </>
          )}
        </button>
      </div>
      {error && <p className="text-danger mt-2 mb-0">{error}</p>}
    </div>
  );
};