import { Router } from "express";
import { SendMessageController } from "./controllers/SendMessageController";
import { UserController } from "./controllers/UserController";
import { MinistryController } from "./controllers/MinistryController";
import { EventController } from "./controllers/EventController";
import { PhoneController } from "./controllers/PhoneController";
import { SessionController } from "./controllers/SessionController";

import { upload } from "./config/multer";
import { auth } from "./middleware/auth";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

//Router to send message to whatsapp
router.post("/send-message", new SendMessageController().handle);

//Router to create a session
router.post("/sessions", new SessionController().handle);

router.use(auth);
//Router about users
router.post("/users", new UserController().create);
router.delete("/users/:id", new UserController().delete);
router.get("/users", new UserController().getAllUsers);

//Router about ministries
router.post("/ministries", new MinistryController().create);
router.get("/ministries", new MinistryController().getAllMinistries);

//Router about events
router.post("/events", upload.single("file"), new EventController().create);
router.put("/events/:id", upload.single("file"), new EventController().update);
router.delete("/events/:id", new EventController().delete);
router.get("/events", new EventController().getAllEvents);

//Router about phones
router.post("/phones", new PhoneController().create);
router.get("/phones", new PhoneController().getAllPhones);

export { router };
