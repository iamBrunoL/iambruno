import express from "express";
import morgan from "morgan";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

import paginasRoutes from "./routes/paginas.routes.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false
}));

//app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Asegúrate de tener esto

app.use('/', paginasRoutes);

app.use(express.static(path.join(__dirname, "public")));

const titulo404 = "Página No Encontrada";

app.use((req, res, next) => {
    res.status(404).render('error404', { titulo: titulo404 });
});

export default app;
