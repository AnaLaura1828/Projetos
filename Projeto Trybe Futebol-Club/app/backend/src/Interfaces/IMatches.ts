export interface IMatches {
  'id': 1,
  'homeTeam': 16,
  'homeTeamGoals': 1,
  'awayTeam': 8,
  'awayTeamGoals': 1,
  'inProgress': false,
  'teamHome': {
    'teamName': 'São Paulo'
  },
  'teamAway': {
    'teamName': 'Grêmio'
  }
}

export interface IMatchesPatch {
  homeTeam?: number;
  awayTeam?: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}
