const express = require("express");
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");
const { BookModel } = require("../Model/Book.model");

const bookRouter = express.Router();
const validBook=async(req,res,next)=>{
    const id=req.body.id;
    const title=req.body.title;
    const tag=req.body.tag;
    const author=req.body.book_author;
    if(id&&tag&&title&&author){
       await next();
    }else{
        res.send("Please fill all fields")
    }

}
bookRouter.get("/", async (req, res) => {
  const books = await BookModel.find();
  res.send(books)
});

bookRouter.post('/create',authentication,validBook, async (req, res) => {
    const newBook= req.body;
    const books= new BookModel(newBook);
    await books.save();
    res.send("Book created successfully")
});

bookRouter.put('/:id',authentication,authorization, async (req, res) => {
    const id= req.params.id;
    const updateBook= req.body;
    await BookModel.replaceOne({id:id},updateBook);

    res.send("Book updated successfully")

});

bookRouter.delete('/:id',authentication,authorization, async (req, res) => {
    const id= req.params.id;
    await BookModel.deleteOne({id:id});
    res.send("Book Deleted successfully")
});

module.exports = bookRouter;