import { IMatches, IMatchesPatch } from '../Interfaces/IMatches';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matchers';

export default class MatchesService {
  private tableTeams;
  constructor(private matches = Matches) {
    this.tableTeams = Teams;
  }

  public async getAll(): Promise<Matches[]> {
    const matches = await this.matches.findAll({
      include: [{ model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });

    return matches;
  }

  public async getInProgress(query: boolean): Promise<Matches[]> {
    const found = await this.matches.findAll({
      where: { inProgress: query },
      include: [{ model: Teams, as: 'teamHome' },
        { model: Teams, as: 'teamAway' }],
    });
    return found;
  }

  public async createMatches(newMatches: IMatches) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newMatches;
    const homeId = await this.tableTeams.findByPk(homeTeam);
    const awayId = await this.tableTeams.findByPk(awayTeam);
    if (!homeId || !awayId) {
      return { status: 404, response: { message: 'There is no team with such id!' } };
    }
    const result = await this.matches.create(
      {
        homeTeam,
        homeTeamGoals,
        awayTeam,
        awayTeamGoals,
        inProgress: true,
      },
    );
    return { status: 201, response: result };
  }

  public async patchMatches(id: number) {
    const result = await this.matches.update(
      {
        inProgress: false },
      { where: { id } },
    );
    return { result, message: 'Finished' };
  }

  public async upDateMatches(id: number, matches: IMatchesPatch) {
    await this.matches.update(
      { ...matches },
      { where: { id } },
    );
    return matches;
  }
}
