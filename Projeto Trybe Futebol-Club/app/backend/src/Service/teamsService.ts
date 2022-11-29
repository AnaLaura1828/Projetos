import { ITeam, ITeamId } from '../Interfaces/ITeam';
import Teams from '../database/models/Teams';

export default class TeamsService {
  constructor(private team = Teams) {}

  public async getAll(): Promise<ITeam[]> {
    const teams = await this.team.findAll();
    return teams;
  }

  public async getById(id: number): Promise<ITeamId | null> {
    const teamId = await this.team.findByPk(id);
    return teamId;
  }
}
