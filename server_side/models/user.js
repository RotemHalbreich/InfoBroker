class user {
    constructor(first_name, last_name, email, password, admin){
        this.first_name = first_name;
        this.last_name= last_name;
        this.email = email;
        this.password = password;
        this.admin = admin
    }
}

module.exports = user