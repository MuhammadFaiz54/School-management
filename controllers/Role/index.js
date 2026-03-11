const { validationResult } = require("express-validator")
const Role = require("../../models/authorization/role_model")
const UserRole = require("../../models/authorization/userRole")

const RoleCreateFn = async (req, res) => {
    try {
        const checkValidation = validationResult(req)

        if (!checkValidation.isEmpty()) {
            return res.status(400).json({ message: checkValidation.array() })
        }
        const { name } = req.body
        const slug = name.toLowerCase().replace(/ /g, '-')
        const newRole = await Role.create({
            name,
            slug,
            createdBy: req.user.id
        })
        return res.status(200).json({ message: "Role created successfully", newRole })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const RoleGetFn = async (req, res) => {
    try {

        const allRole = await Role.findAll()
        return res.status(200).json({ message: "Role created successfully", allRole })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const RoleGetForSpacificFn = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "Please pass id in params" })

        }
        const allRole = await Role.findAll({ where: { createdby: id } })
        console.log('Result:', JSON.stringify(allRole))
        console.log('Count:', allRole.length)
        return res.status(200).json({ message: "Role created successfully", allRole })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Role Assign
const AssignRoleFn = async (req, res) => {
    try {
        const { id } = req.user
        const { user_id, role_id } = req.body
        const checkhas = await UserRole.findOne({where:{user_id,role_id}})
        if (checkhas) {
            return res.status(400).json({message:"You have Already have this permission"})
        }
        await UserRole.create({
            user_id,
            role_id,
            createdby:id
        })
        return res.status(200).json({ message: `Role Assign successfully to this ${user_id} role${role_id} ` })
        // createdby
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    RoleCreateFn,
    RoleGetFn,
    RoleGetForSpacificFn,
    AssignRoleFn
}