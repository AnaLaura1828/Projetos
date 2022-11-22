import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Necromancer extends Archetype {
  public _energyType: 'mana';
  static _score = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'mana';
  }

  get energyType(): EnergyType {
    return this._energyType;
  }

  static createdArchetypeInstances(): number {
    Necromancer._score += 1;
    return Necromancer._score;
  }
}