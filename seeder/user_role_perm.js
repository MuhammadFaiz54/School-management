const Permission = require("../models/authorization/permission_model")
const Role = require("../models/authorization/role_model")
const RolePermission = require("../models/authorization/role_permission")
const User = require("../models/authorization/user")
const bcrypt = require('bcryptjs')
const UserRole = require("../models/authorization/userRole")
const seed_role_user_permission_data = async () => {

    const roleCount = await Role.count()
if (roleCount>0){
    console.log('Already seeded! ⏭️')
    return
}

    const Roles = await Role.bulkCreate([
        { name: 'Admin', slug: 'admin' },
        { name: 'Librarian', slug: 'librarian' },
        { name: 'Member', slug: 'member' }
    ], {
        ignoreDuplicates: true,
        returning: true
    })

    const Permissions = await Permission.bulkCreate([
        { name: 'Add Book', slug: 'add_book' },
        { name: 'Remove Book', slug: 'remove_book' },
        { name: 'Assign Role', slug: 'assign_role' },
        { name: 'Borrow Book', slug: 'borrow_book' },
        { name: 'Read Book', slug: 'read_book' },
        { name: 'Add Author', slug: 'add_author' },
        { name: 'Remove Author', slug: 'remove_author' },
        { name: 'Remove User', slug: 'remove_user' },

    ], { ignoreDuplicates: true, returning: true })
    const admin = Roles.find(r => r.slug === 'admin')
    const librarian = Roles.find(r => r.slug === 'librarian')
    const member = Roles.find(r => r.slug === 'member')

    const add_book = Permissions.find(r => r.slug === 'add_book')
    const romove_book = Permissions.find(r => r.slug === 'remove_book')
    const assign_role = Permissions.find(r => r.slug === 'assign_role')
    const borrow_book = Permissions.find(r => r.slug === 'borrow_book')
    const read_book = Permissions.find(r => r.slug === 'read_book')
    const add_author = Permissions.find(r => r.slug === 'add_author')
    const remove_author = Permissions.find(r => r.slug === 'remove_author')
    const remove_user = Permissions.find(r => r.slug === 'remove_user')
    await RolePermission.bulkCreate([
        // Admin
        { role_id: admin.id, permission_id: add_book.id },
        { role_id: admin.id, permission_id: romove_book.id },
        { role_id: admin.id, permission_id: assign_role.id },
        { role_id: admin.id, permission_id: borrow_book.id },
        { role_id: admin.id, permission_id: read_book.id },
        { role_id: admin.id, permission_id: add_author.id },
        { role_id: admin.id, permission_id: remove_author.id },
        { role_id: admin.id, permission_id: remove_user.id },

        // Librarian
        { role_id: librarian.id, permission_id: add_book.id },
        { role_id: librarian.id, permission_id: romove_book.id },
        { role_id: librarian.id, permission_id: borrow_book.id },
        { role_id: librarian.id, permission_id: read_book.id },
        { role_id: librarian.id, permission_id: add_author.id },
        { role_id: librarian.id, permission_id: remove_author.id },
        { role_id: librarian.id, permission_id: remove_user.id },

        // Member
        { role_id: member.id, permission_id: borrow_book.id },
        { role_id: member.id, permission_id: read_book.id},
    ], {
        ignoreDuplicates: true
    })


    const hashPass =await bcrypt.hash('admin123', 10)
    const adminCreate = await User.findOrCreate({
        where: {email: 'admin@gmal.com'},
        defaults:{ name: 'admin', password: hashPass }
    })
    await UserRole.findOrCreate({
        where: { user_id: adminCreate[0].id, role_id: admin.id }
    })
    console.log('Database seeded! ✅') 

}
module.exports = seed_role_user_permission_data