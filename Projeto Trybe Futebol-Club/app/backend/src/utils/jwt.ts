import * as jwt from 'jsonwebtoken';
import ILogin from '../Interfaces/ILogin';

require('dotenv/config');

export default class JwtUtil {
  newToken = (data: ILogin) => {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const token = jwt.sign(data, secret);
    return token;
  };

  // JwtPayload é onde se encontram os dados referentes à própria autenticação
  validateToken = (token: string): jwt.JwtPayload => {
    const data = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret');
    return data as jwt.JwtPayload;
  };
}
