const router = require("express").Router();

// import controllers
const UserController = require("./controllers/UserController");

router.post("/user", UserController.create);
router.post("/user/login", UserController.login);
router.get("/user", UserController.getAll);
router.get("/user/:id", UserController.getOne);
router.put("/user/:id", UserController.Update);
router.delete("/user/:id", UserController.Delete);

module.exports = router;
