class User {
    constructor(id, code, name, phone, email, password,address, hashedPassword) {
        this.id = id
        this.code = code
        this.phone = phone
        this.name = name
        this.email = email
        this.password = password
        this.address= address
        this.hashedPassword = hashedPassword
    }
}

module.exports = User