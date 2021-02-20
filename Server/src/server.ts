import App from "./app/App";
import validateEnv from "./app/validateEnv";
import ComentsController from "../controllers/comments.controller";
import ProjectsController from "../controllers/projects.controller";
import UserController from "../controllers/users.controller";

// Creating environment variables
import "dotenv/config";

// Validatin enivronmental variables
validateEnv();

// Starting app
const app = new App([
  // Adding all controllers
  new ComentsController(),
  new ProjectsController(),
  new UserController(),
]);

// Express app listen
app.listen();
