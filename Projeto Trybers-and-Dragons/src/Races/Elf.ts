import Race from './Race';

export default class Elf extends Race {
  public _maxLifePoints: number;
  public static _score = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    this._maxLifePoints = 99;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints; 
  }

  static createdRacesInstances(): number {
    Elf._score += 1;
    return Elf._score;
  }
}