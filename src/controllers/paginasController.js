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

export const renderMusica = async (req, res) => {
  const titulo = "Música";
  res.render("music", { titulo: titulo });
};

export const createComentario = async (req, res) => {
  // Obtener información del navegador desde el encabezado user-agent
  const navegador = req.headers["user-agent"];
  // Extraer el sistema operativo y la versión del agente de usuario
  const sistemaOperativo = navegador.match(/\(([^)]+)\)/)[1];
  // Obtener el tipo de dispositivo desde el agente de usuario
  const tipoDispositivo = navegador.includes("Mobile") ? "Móvil" : "Escritorio";

  // Obtener la IP del usuario
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    const { name, email, message } = req.body;

    console.log("Datos recibidos:", { name, email, message });

    // Insertar el comentario en la base de datos
    const result = await pool.query(
      "INSERT INTO comentarios (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    // Registro de log
    const nombreHost = req.headers.host;
    const crearLog = `Registro de comentario a las ${new Date().toLocaleString()} - IP: ${ip} - Nombre de host: ${nombreHost} - Navegador: ${navegador} - Sistema Operativo: ${sistemaOperativo} - Tipo de Dispositivo: ${tipoDispositivo}`;
    await pool.query("INSERT INTO reportes (contenido) VALUES (?)", [crearLog]);

    // Enviar una respuesta exitosa
    res
      .status(200)
      .json({ success: true, message: "Comentario registrado correctamente." });
  } catch (error) {
    console.error("Error al registrar el comentario:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al registrar el comentario." });
  }
};
