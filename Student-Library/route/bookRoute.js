const bookController = require("../controller/bookController");
const router = require('express').Router();

//Add new book//
router.post("/addNewBook", bookController.addNewBook);

//Get All books//
router.get("/getBooks", bookController.getAllBooks);

//Get Book by id//
router.get("/getBook", bookController.getBook) ;

//Update Book//
router.put("/updateBook", bookController.updateBook);

module.exports = router;