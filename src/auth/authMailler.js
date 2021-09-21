import mailer from 'nodemailer'
import jwt from 'jsonwebtoken'
export async function sendMail(email) {
    const mailTransport = mailer.createTransport({
        service: process.env.MAIL_SERVICE,
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    const url = `http://localhost:4444/auth/verification/${email}`
    const mailOpts = {
        from: process.env.EMAIL,
        to: email,
        subject: `Please verify this email : ${email}`,
        text: `click this link to verify your email : ${url}`,
        html: "<b>Xác nhận email</b>"
    }
    await mailTransport.sendMail(mailOpts, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}
export async function mailForgotPassword(code, email) {
    const mailTransport = mailer.createTransport({
        service: process.env.MAIL_SERVICE,
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    const encode = jwt.sign(email, process.env.JWT_SECRET)
    const url = `http://localhost:4444/recovery/${encode}`
    const mailOpts = {
        from: process.env.EMAIL,
        to: email,
        subject: `Xác nhận đổi mật khẩu : ${email}`,
        text: `Ấn vào: ${url} và nhập code : ${code} `
    }
    await mailTransport.sendMail(mailOpts, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}