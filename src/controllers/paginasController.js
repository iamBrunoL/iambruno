export const renderIndex = async (req, res) => {
  const titulo = "I am Bruno";
  res.render("index", { titulo: titulo });
};

export const renderGaleria = async (req, res) => {
  const titulo = "Galería de imágenes";
  res.render("gallery", { titulo: titulo });
};

export const renderAcerca = async (req, res) => {
  const titulo = "Acerca de";
  res.render("about", { titulo: titulo });
};

export const renderVideogames = async (req, res) => {
  const titulo = "Videojuegos";
  res.render("videogames", { titulo: titulo });
};

export const renderComentarios = async (req, res) => {
  const titulo = "Comentarios";
  res.render("comentarios", { titulo: titulo });
};

export const renderProximamente = async (req, res) => {
  const titulo = "Próximamente";
  res.render("comingsoon", { titulo: titulo });
};

import { pool } from "../db.js";

export const createComentario = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const [result] = await pool.query(
            "INSERT INTO comentarios (name, email, message) VALUES (?, ?, ?)",
            [name, email, message]
        );
        res.redirect("/comentarios");
    } catch (error) {
        console.error("Error al insertar el comentario:", error);
        res.status(500).send("Error al insertar el comentario");
    }
};
