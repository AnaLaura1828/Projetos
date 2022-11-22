import Race from './Race';

export default class Halfling extends Race {
  public _maxLifePoints: number;
  public static _score = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    this._maxLifePoints = 60;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints; 
  }

  static createdRacesInstances(): number {
    Halfling._score += 1;
    return Halfling._score;
  }
}