const mongoose = require('mongoose');


const booksSchema  = mongoose.Schema({
    id:{type:Number,required:true},
    title:{type:String,required:true},
    book_author:{type:String,required:true},
    tag:{type:String,required:true},
})
const BookModel = mongoose.model("books",booksSchema)

module.exports = {
 BookModel
}