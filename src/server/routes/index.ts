import { Router } from "express";

import { CidadesController } from "../controller";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Alterei coisas");
});

router.get("/create", CidadesController.create);

export { router };
