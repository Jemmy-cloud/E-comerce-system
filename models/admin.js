class Admin {
    constructor(id, code, name, password, phone, email, hashedPassword) {
        this.id = id
        this.code = code
        this.name = name
        this.password = password
        this.phone = phone
        this.email = email
        this.hashedPassword = hashedPassword
    }
}

module.exports = Admin