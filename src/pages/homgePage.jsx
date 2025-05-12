import React from "react";
import { PostList } from "../components/PostList";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
             Publicaciones Informatica
          </h1>
          <p className="text-lg text-gray-600">
            Explora las últimas publicaciones.
          </p>
        </header>
        <main>
          <PostList />
        </main>
      </div>
    </div>
  );
};