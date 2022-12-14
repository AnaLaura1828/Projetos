import Matches from '../database/models/Matchers';
import Teams from '../database/models/Teams';

export default class LeaderBoardService {
  private _leaderboard;
  private _team;
  constructor() {
    this._leaderboard = Matches;
    this._team = Teams;
  }

  // total do jogo
  private async gamesHome(team:number) {
    const result = await this._leaderboard.findAll({ where: { inProgress: false } });
    return result.filter((match) => match.homeTeam === team && !match.inProgress);
  }

  private async gamesAway(team:number) {
    const data = await this._leaderboard.findAll({ where: { inProgress: false } });
    return data.filter((match) => match.awayTeam === team && !match.inProgress);
  }

  // vitoria
  private async victoryHome(team:number) {
    const result = await this.gamesHome(team);
    return result.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
  }

  private async victoryAway(team:number) {
    const data = await this.gamesAway(team);
    return data.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
  }

  private async drawsHome(team:number) {
    const result = await this.gamesHome(team);
    return result.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
  }

  private async drawsAway(team:number) {
    const data = await this.gamesAway(team);
    return data.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
  }

  // perdeu
  private async losesHome(team:number) {
    const result = await this.gamesHome(team);
    return result.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
  }

  private async losesAway(team:number) {
    const data = await this.gamesAway(team);
    return data.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
  }

  private async goalsHome(team:number) {
    const result = await this.gamesHome(team);
    return result.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
  }

  private async goalsAway(team:number) {
    const data = await this.gamesAway(team);
    return data.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
  }

  private async goalsOwnHome(team:number) {
    const data = await this.gamesHome(team);
    return data.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
  }

  private async goalsOwnAway(team:number) {
    const data = await this.gamesAway(team);
    return data.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
  }

  private async efficiencyHome(team:number) {
    const points = ((await this.victoryHome(team)).length * 3)
    + (await this.drawsHome(team)).length;
    const maxPointsPossible = (await this.gamesHome(team)).length * 3;

    return ((points / maxPointsPossible) * 100).toFixed(2);
  }

  private async efficiencyAway(team:number) {
    const points = ((await this.victoryAway(team)).length * 3)
    + (await this.drawsAway(team)).length;
    const maxPointsPossible = (await this.gamesAway(team)).length * 3;

    return ((points / maxPointsPossible) * 100).toFixed(2);
  }

  public async getAllHome() {
    const getTeams = await this._team.findAll();

    const leaderboard = await Promise.all(getTeams.map(async (team) => ({
      name: team.teamName,
      totalPoints: ((await this.victoryHome(team.id)).length * 3)
       + (await this.drawsHome(team.id)).length,
      totalGames: (await this.gamesHome(team.id)).length,
      totalVictories: (await this.victoryHome(team.id)).length,
      totalDraws: (await this.drawsHome(team.id)).length,
      totalLosses: (await this.losesHome(team.id)).length,
      goalsFavor: await this.goalsHome(team.id),
      goalsOwn: await this.goalsOwnHome(team.id),
      goalsBalance: await this.goalsHome(team.id) - await this.goalsOwnHome(team.id),
      efficiency: await this.efficiencyHome(team.id),
    })));
    const result = leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn);
    return { status: 200, result };
  }

  public async getAllAway() {
    const getTeams = await this._team.findAll();

    const leaderboard = await Promise.all(getTeams.map(async (team) => ({
      name: team.teamName,
      totalPoints: ((await this.victoryAway(team.id)).length * 3)
      + (await this.drawsAway(team.id)).length,
      totalGames: (await this.gamesAway(team.id)).length,
      totalVictories: (await this.victoryAway(team.id)).length,
      totalDraws: (await this.drawsAway(team.id)).length,
      totalLosses: (await this.losesAway(team.id)).length,
      goalsFavor: await this.goalsAway(team.id),
      goalsOwn: await this.goalsOwnAway(team.id),
      goalsBalance: await this.goalsAway(team.id) - await this.goalsOwnAway(team.id),
      efficiency: await this.efficiencyAway(team.id),
    })));
    const response = leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn);

    return { status: 200, response };
  }
}
