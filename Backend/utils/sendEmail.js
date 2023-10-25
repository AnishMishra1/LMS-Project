import nodemailer from "nodemailer"

const sendEmail = async function (email, subject, message) {
    // create reusable transporter object using defualt SMTP transport

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dallas6@ethereal.email',
        pass: 'kCseB5FynWAErr31qb'
    }
    });

    // await transporter.sendEmail({
    //     from: process.env.SMTP_FROM_EMAIL,
    //     to: email,
    //     subject: subject,
    //     html: message,
    // })

    const mailInfo ={
        from: process.env.SMTP_FROM_EMAIL,
        to: email,
         subject: subject,
         html: message,
    }

    await transporter.sendMail(mailInfo);
}

export default sendEmail