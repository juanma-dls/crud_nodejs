import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { router } from "./routes/routes";
import { routerUser } from "./routes/routerUser";
import { routerProduct } from "./routes/routerProduct";
import { routerCategory } from "./routes/routerCategory";
import { routerAuth } from "./routes/routerLogin"
import { routerMedic } from "./routes/routerMedic";
import { routerPatient } from "./routes/routerPatient";
import "./database";
import session from "express-session";
import passport from "passport";
import morgan from "morgan";
import flash from "connect-flash"
import { User } from "./entities/User";

const app = express();

// SESSION
app.use(session({
  secret: 'juanmanueldelossantos',
  resave: false,
  saveUninitialized: false
}));

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); 
app.use(passport.initialize());
app.use(passport.session());
require("./lib/passport")
app.use(flash())

// GLOBAL VARIANT
app.use((request, response, next) => {

  app.locals.success = request.flash("success")
  app.locals.error = request.flash("error")
  app.locals.user = request.user;  

  next()
});

// ROUTES
app.use(router)
app.use(routerUser);
app.use(routerProduct);
app.use(routerCategory);
app.use(routerAuth);
app.use(routerMedic);
app.use(routerPatient);


// SERVER

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.use(express.static(path.join(__dirname, "..", "public")));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "..", "views"));

app.listen(8080, () => {
  console.log("Server is running at port 8080");
});
