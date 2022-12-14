import { Request, Response } from 'express';
import LeaderboardService from '../Service/leaderboardService';

export default class LeaderboardController {
  public leaderboardService = new LeaderboardService();

  async getAllHome(_req:Request, res:Response) {
    const result = await this.leaderboardService.getAllHome();
    return res.status(result.status).json(result.result);
  }

  async getAllAway(_req:Request, res:Response) {
    const result = await this.leaderboardService.getAllAway();

    return res.status(result.status).json(result.response);
  }
}
