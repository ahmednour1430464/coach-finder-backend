import express from "express";
import ErrorController from "./controllers/ErrorController";
import AppError from "./libs/AppError";
import getRoutes from "./libs/Helpers";
import MainRouter from "./routers/MainRouter";
import cors, { CorsOptions, CorsRequest } from "cors";
const app = express();

const options: CorsOptions = {
  origin: "*",
  allowedHeaders: ["content-type"],
  maxAge: 86400,
  methods: "GET,PUT,POST",
  preflightContinue: true,
  optionsSuccessStatus: 204,
};

app.use(cors(options));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

app.use("/", MainRouter);

app.use("*", (req, res, next: Function) => {
  const error = new AppError(404, "not found", "undefined route");
  next(error, req, res, next);
});

if (process.env.NODE_ENV == "development") {
  console.log(getRoutes(app));
}

app.use(ErrorController);

export default app;
