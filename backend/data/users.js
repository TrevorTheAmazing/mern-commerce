import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Test User',
        email: 'test@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Sample User',
        email: 'sample@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users