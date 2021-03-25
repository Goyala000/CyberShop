import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('12345', 15),
        isAdmin: true
    },
    {
        name: 'Test',
        email: 'test123@gmail.com',
        password: bcrypt.hashSync('12345', 15)
    }
]

export default users;