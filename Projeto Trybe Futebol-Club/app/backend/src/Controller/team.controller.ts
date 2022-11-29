import { Request, Response } from 'express';
import TeamsService from '../Service/teamsService';

export default class TeamController {
  public teamService = new TeamsService();

  async getAllController(_req: Request, res: Response) {
    const teams = await this.teamService.getAll();

    res.status(200).json(teams);
  }

  async getByIdController(req: Request, res: Response) {
    const { id } = req.params;
    const teamId = await this.teamService.getById(Number(id));
    res.status(200).json(teamId);
  }
}
