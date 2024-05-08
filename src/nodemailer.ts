class Configs {
  public host = process.env.EMAIL_SERVER_HOST
  public port = process.env.EMAIL_SERVER_PORT
  public user = process.env.EMAIL_SERVER_USER
  public password = process.env.EMAIL_SERVER_PASSWORD
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Configs()
