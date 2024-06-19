import { Router } from "express";
import {
  renderAcerca,
  renderComentarios,
  renderGaleria,
  renderIndex,
  renderProximamente,
  renderVideogames,
  createComentario,
  renderMusica,
  renderTerminos,
} from "../controllers/paginasController.js";

const router = Router();

router.get("/", renderIndex);
router.get("/gallery", renderGaleria);
router.get("/about", renderAcerca);
router.get("/videogames", renderVideogames);
router.get("/comentarios", renderComentarios);
router.get("/comingsoon", renderProximamente);
router.get("/music", renderMusica);
router.get("/termines", renderTerminos);
router.post("/addComentario", createComentario);

export default router;
