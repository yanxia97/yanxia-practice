import Athlete from './athlete.js';

class Athletes {
  constructor() {
    this.#list = [];
  }

  #list;

  draw(rarityRange) {
    const {min, max} = rarityRange;
    const rarity = this.random(min, max);
    const athlete = new Athlete();
    this.#list.push(athlete.initial(rarity));
  }

  effect(effects, PRC) {
    for (const prop in effects) {
      for (const athlete in this.#list) {
        athlete.change(prop, this.calcPRC(effects[prop], PRC));
      }
    }
  }

  calcPRC(delta, PRC) {
    if (delta > 0) {
      return +((delta * (1 + PRC / 30)).toFixed(2));
    } else {
      return +((delta * (1 - PRC / 50)).toFixed(2));
    }
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default Athletes;
