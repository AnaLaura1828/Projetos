import { Request, Response } from 'express';
import LeaderboardService from '../Service/leaderboardService';

export default class LeaderboardController {
  public leaderboardService = new LeaderboardService();

  async getAll(_req:Request, res:Response) {
    const result = await this.leaderboardService.getAll();
    return res.status(result.status).json(result.response);
  }
}
