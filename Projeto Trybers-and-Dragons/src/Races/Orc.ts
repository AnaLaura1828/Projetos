import Race from './Race';

export default class Orc extends Race {
  public _maxLifePoints: number;
  public static _score = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    this._maxLifePoints = 74;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints; 
  }

  static createdRacesInstances(): number {
    Orc._score += 1;
    return Orc._score;
  }
}