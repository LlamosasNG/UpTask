import { transporter } from '../config/nodemailer'
import { confirmationEmailTemplate } from './templates/confirmationEmail'
import { resetPasswordEmailTemplate } from './templates/resetPasswordEmail'

interface IEmail {
  email: string
  name: string
  token: string
}
export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    const confirmUrl = `${process.env.FRONTEND_URL}/auth/confirm-account`

    const info = await transporter.sendMail({
      from: 'UpTask <admin@uptask.com>',
      to: user.email,
      subject: 'UpTask - Confirma tu cuenta',
      text: 'Confirma tu cuenta en Uptask',
      html: confirmationEmailTemplate(
        {
          name: user.name,
          token: user.token,
        },
        confirmUrl
      ),
    })
    console.log('Mensaje enviado: ', info.messageId)
  }

  static sendPasswordResetToken = async (user: IEmail) => {
    const resetUrl = `${process.env.FRONTEND_URL}/auth/new-password`

    const info = await transporter.sendMail({
      from: 'UpTask <admin@uptask.com>',
      to: user.email,
      subject: 'UpTask - Reestablece tu contraseña',
      text: 'Reestablece tu contraseña en Uptask',
      html: resetPasswordEmailTemplate(
        {
          name: user.name,
          token: user.token,
        },
        resetUrl
      ),
    })
    console.log('Mensaje enviado: ', info.messageId)
  }
}
