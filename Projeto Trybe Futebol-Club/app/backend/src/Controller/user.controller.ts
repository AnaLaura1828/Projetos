import { Request, Response } from 'express';
import UserService from '../Service/usersService';
import JwtUtil from '../utils/jwt';

export default class UserController {
  service = new UserService();
  token = new JwtUtil();

  public validateLoginController = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const result = await this.service.authLogin(authorization || 'string');
    // o role é minha chave do obj por isso tem que ser esse nome
    return res.status(200).json({ role: result && result.role });
  };

  public loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const validate = await this.service.validateLogin(email, password);
    if (validate === 400) { return res.status(400).json({ message: 'All fields must be filled' }); }
    if (validate === 401) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    if (validate === 200) { return res.status(200).json({ token: this.token.newToken(req.body) }); }
  };
}
