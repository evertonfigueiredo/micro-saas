/* eslint-disable no-useless-constructor */
import nodemailer from 'nodemailer'
import config from '../../nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

class Mail {
  constructor(
    public from?: string,
    public to?: string,
    public subject?: string,
    public message?: string,
  ) {}

  async sendMail() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: this.subject,
      html: this.message,
    }

    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false,
      auth: {
        user: config.user,
        pass: config.password,
      },
    } as SMTPTransport.Options)

    try {
      const info = await transporter.sendMail(mailOptions)
      return info
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error)
      throw error
    }
  }
}

export default new Mail()
