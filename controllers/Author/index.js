const { validationResult } = require("express-validator")
const Author = require("../../models/author_model")

const AddAuthorFn = async (req, res) => {
    try {
        const checkValidation = validationResult(req)
        if (!checkValidation.isEmpty()) {
            return res.status(400).json({ message: checkValidation.array() })
        }
        const { id } = req.user
        const { name } = req.body
        const slug = name.toLowerCase().replace(/ /g, '-')
        const checkAuthor = await Author.findOne({ where: { slug } })
        if (checkAuthor) {
            return res.status(400).json({ message: "This Author Already Exist" })
        }
        const AddAuthor = await Author.create({
            name,
            slug,
            createdBy: id
        })
        return res.status(201).json({ message: `Author Successfully Add `, AddAuthor })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const GetAllAuthorFn = async (req, res) => {
    try {
        const allAuthors = await Author.findAll()
        return res.status(200).json({ message: `Author Successfully fetch `, allAuthors })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const GetSpecificAuthorFn = async (req, res) => {
    try {
        const { id } = req.params
        const allAuthors = await Author.findAll({ where: { id: id } })
        return res.status(200).json({ message: `Author Successfully fetch `, allAuthors })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getauthorsaddUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "please pass param id" })
        }
        const allAuthors = await Author.findAll({ where: { createdBy: id } })
        return res.status(200).json({ message: `Author Successfully fetch `, allAuthors })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params

        const searchAuthor = await Author.findOne({ where: { id } })
        if (!searchAuthor) {
            res.status(400).json({ message: "Author not found" })
        }
        await Author.destroy({ where: { id } })
        res.status(200).json({message:"Author delete successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}
module.exports = {
    AddAuthorFn,
    GetAllAuthorFn,
    GetSpecificAuthorFn,
    getauthorsaddUser,
    deleteAuthor
}