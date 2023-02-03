import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    service: "outlook",
    auth: {
        user: "employeesmanagement@outlook.com",
        pass: "pirate987456321"
    }   
})

const sendConfirmationEmail = (email, activationCode) => {
    transport.sendMail({
        from: "employeesmanagement@outlook.com",
        to: email,
        subject: "Confirm your account!",
        html: `<div>
        <h1>Confirmation Email!</h1>
        <h2>Hello<h2>
        <p>To activate your account, please click on the link<p>
        <a href=http://localhost:8000/confirm/${activationCode}>Click here! </a>
        </div>
        `
    }) 
    .catch((err) => console.log(err));
}

const sendCreateEmail = (email, plainPassword) => {
    transport.sendMail({
        from: "employeesmanagement@outlook.com",
        to: email,
        subject: "Welcome to our company ",
        html: `<div>
        <h1>Welcome to our company </h1>
        <h2>Hello<h2>
        <p>To can enter in our company, please enter this email and this password :<p>
        <p> email: ${email}<p>
        <p> password: ${plainPassword}<p>
        `
    }) 
    .catch((err) => console.log(err));
}

const sendForgotPassword= (email,userId, token) => {
    transport.sendMail({
        from: "employeesmanagement@outlook.com",
        to: email,
        subject: "Password Reset!",
        html: `<div>
        <h1>Password Reset!</h1>
        <h2>Hello<h2>
        <p>To reset your password, please click on the link<p>
        <a href=http://localhost:8000/reset-password/${userId}/${token}>Click here! </a>
        </div>
        `
    })
    .catch((err) => console.log(err));
}
export  { sendConfirmationEmail, sendCreateEmail, sendForgotPassword };