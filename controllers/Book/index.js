const { validationResult } = require("express-validator")
const Book = require("../../models/book_model")

const AddBookFn = async (req,res) => {
    try {
        const checkValidation = validationResult(req)
        if(!checkValidation.isEmpty()){
            return res.status(400).json({message:checkValidation.array()})
        }
        const {id} = req.user
        const {name,author_id} = req.body
        const slug = name.toLowerCase().replace(/ /g, '-')
        const checkBook = await Book.findOne({where:{slug}})
        if (checkBook) {
            return res.status(400).json({message:"Book Already Exist"})
        }
        const newBook = await Book.create({
            name,
            slug,
            author_id,
            createdBy:id
        })
        res.status(201).json({message:"Book Add Successfully",newBook})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports = {AddBookFn}