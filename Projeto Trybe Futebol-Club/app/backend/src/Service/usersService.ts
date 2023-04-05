import bcrypt = require('bcryptjs');
import JwtUtil from '../utils/jwt';
import Users from '../database/models/users';

export default class UserService {
  public jwt = new JwtUtil();

  constructor(private users = Users) {}

  // vou fazer a verificação de autenticação
  public authLogin = async (authorization: string) => {
    // verifico se tenho autorização
    const jwt = this.jwt.validateToken(authorization);
    const user = await this.users.findOne({ where: { email: jwt.email } });
    return user;
  };

  public validateLogin = async (email: string, password: string) => {
    if (!email || !password) { return 400; }

    const user = await this.users.findOne(({ where: { email } }));
    const passwordCompare = user && bcrypt.compareSync(password, user.password);
    if (passwordCompare) { return 200; }
    return 401;
  };
}
