import { Request, Response } from 'express';
import MatchesService from '../Service/matchesService';

export default class MatchesController {
  public matchesService = new MatchesService();

  async getAllController(_req: Request, res: Response) {
    const matches = await this.matchesService.getAll();

    res.status(200).json(matches);
  }

  async getSearchController(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const boolean = inProgress === 'true';
      const found = await this.matchesService.getInProgress(boolean);
      return res.status(200).json(found);
    }
    const matches = await this.matchesService.getAll();
    return res.status(200).json(matches);
  }

  async createMatchesController(req: Request, res: Response) {
    const { homeTeam, awayTeam } = req.body;
    if (!homeTeam || !awayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    if (homeTeam === awayTeam) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }
    const newResult = await this.matchesService.createMatches(req.body);
    return res.status(newResult.status).json(newResult.response);
  }

  async patchMatchesController(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.matchesService.patchMatches(Number(id));
    return res.status(200).json(result.message);
  }

  async upDateMatchesController(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const result = await this.matchesService.upDateMatches(Number(id), body);
    return res.status(200).json(result);
  }
}
