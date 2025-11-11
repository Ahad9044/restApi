import validator from 'validator';

const validate = (firstName, lastName, emailId, password, age) => {

    if (age < 18) {
        throw new Error("Age is below 18 , not allowed to register")
    }
    if (firstName.length < 4 || !firstName.length > 50) {
        throw new Error("First name should be less that 50 characters and greater than 4 characters")
    }
    else if (lastName.length < 4 || lastName.length > 50) {
        throw new Error("Last name should be less that 50 characters and greater than 4 characters")
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Invalid Email Id")
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please choose a strong password")
    }
    return true
}
export default validate