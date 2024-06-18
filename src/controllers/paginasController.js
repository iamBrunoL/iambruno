import { pool } from "../db.js";

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

export const createComentario = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log("Datos recibidos:", { name, email, message });

    // Insert the comment into the database
    const result = await pool.query('INSERT INTO comentarios (name, email, message) VALUES (?, ?, ?)', [name, email, message]);

    //console.log("Resultado de la inserción:", result);

    // Send a success response
    res.status(200).json({ success: true, message: "Comentario registrado correctamente." });
  } catch (error) {
    console.error("Error al registrar el comentario:", error);
    res.status(500).json({ success: false, message: "Error al registrar el comentario." });
  }
};
