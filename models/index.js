const User = require('./authorization/user')
const Author = require('./author_model')
const Book = require('./book_model')
const Permission = require('./authorization/permission_model')
const Role = require('./authorization/role_model')
const BorrowBook = require('./borrowBook_model')
const RolePermission = require('./authorization/role_permission')


User.hasMany(Author,{foreignKey:'user_id'})
Author.belongsTo(User,{foreignKey:'user_id'})

User.hasMany(Book,{foreignKey:'user_id'})
Book.belongsTo(User,{foreignKey:'user_id'})

Author.hasMany(Book,{foreignKey:'author_id'})
Book.belongsTo(Author,{foreignKey:'author_id'})

Role.hasMany(RolePermission,{foreignKey:'role_id'})
RolePermission.belongsTo(Role,{foreignKey:'role_id'})

Permission.hasMany(RolePermission,{foreignKey:'permission_id'})
RolePermission.belongsTo(Permission,{foreignKey:'permission_id'})

User.hasMany(BorrowBook,{foreignKey:'user_id'})
BorrowBook.belongsTo(User,{foreignKey:'user_id'})

Book.hasMany(BorrowBook,{foreignKey:'book_id'})
BorrowBook.belongsTo(Book,{foreignKey:'book_id'})

