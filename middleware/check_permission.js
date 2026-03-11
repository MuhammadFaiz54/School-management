const RolePermission = require("../models/authorization/role_permission")
const UserRole = require("../models/authorization/userRole")

const CheckPermission =  (requiredPermission) => {
    return async (req,res,next) => {
        
        try {
            const {id} = req.user
            if(!id){
                return res.status(400).json({message:"id not valid"})
            }
            const userRoles = await UserRole.findAll({where:{user_id:id}})
            if (userRoles.length<1) {
                return res.status(400).json({message:"no Role found"})
            }
            const roleIds= userRoles.map(v => v.role_id)
            console.log("roleIds===",roleIds);
            
            const permission = await RolePermission.findOne({
                where:{role_id:roleIds},
                include:[{
                    association:'Permission',
                    where:{slug:requiredPermission}
                }]
            })
            
            if (!permission) {
                return res.status(403).json({ message: "Permission denied" })
            }
            next()

        } catch (error) {
            res.status(500).json({ message: "Server error" })
        }
    }
}
module.exports = CheckPermission