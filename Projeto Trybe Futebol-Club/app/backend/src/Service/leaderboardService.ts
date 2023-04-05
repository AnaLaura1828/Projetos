import Matches from '../database/models/Matchers';
import Teams from '../database/models/Teams';

export default class LeaderBoardService {
  private _leaderboard;
  private _team;
  constructor() {
    this._leaderboard = Matches.findAll();
    this._team = Teams;
  }

  // total do jogo
  private async totalGames(team:number) {
    const data = await this._leaderboard;
    return data.filter((match) => match.homeTeam === team && !match.inProgress);
  }

  // vitoria
  private async victorys(team:number) {
    const data = await this.totalGames(team);
    return data.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
  }

  private async draws(team:number) {
    const data = await this.totalGames(team);
    return data.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
  }

  // perdeu
  private async loses(team:number) {
    const data = await this.totalGames(team);
    return data.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
  }

  private async goalsFavor(team:number) {
    const data = await this.totalGames(team);
    return data.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
  }

  private async goalsOwn(team:number) {
    const data = await this.totalGames(team);
    return data.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
  }

  private async efficiency(team:number) {
    const points = ((await this.victorys(team)).length * 3) + (await this.draws(team)).length;
    const maxPointsPossible = (await this.totalGames(team)).length * 3;

    return ((points / maxPointsPossible) * 100).toFixed(2);
  }

  public async getAll() {
    const getTeams = await this._team.findAll();
    const leaderboard = await Promise.all(getTeams.map(async (team) => ({
      name: team.teamName,
      totalPoints: ((await this.victorys(team.id)).length * 3) + (await this.draws(team.id)).length,
      totalGames: (await this.totalGames(team.id)).length,
      totalVictories: (await this.victorys(team.id)).length,
      totalDraws: (await this.draws(team.id)).length,
      totalLosses: (await this.loses(team.id)).length,
      goalsFavor: await this.goalsFavor(team.id),
      goalsOwn: await this.goalsOwn(team.id),
      goalsBalance: await this.goalsFavor(team.id) - await this.goalsOwn(team.id),
      efficiency: await this.efficiency(team.id),
    })));
    const response = leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn);
    return { status: 200, response };
  }
}
