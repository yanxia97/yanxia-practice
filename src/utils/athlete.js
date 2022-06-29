import { clone } from './functions/util.js';

class Athlete {
  constructor() {}

  #data;

  TYPES = {
    GDR: 'GDR', // gender 性别
    AGE: 'AGE', // age 年龄
    PKA: 'PKA', // peakAge 巅峰年龄
    PKT: 'PKT', // peakTime 巅峰时间
    IMP: 'IMP', // improvability 成长性
    POT: 'POT', // potential 天赋
    STR: 'STR', // strength 力量
    REC: 'REC', // reaction 反应
    POW: 'POW', // power 爆发力
    STA: 'STA', // stamina 耐力
    SKL: 'SKL', // skill 技巧
    SPD: 'SPD', // speed 速度
    SPR: 'SPR', // spirit 精神
    INT: 'INT', // intelligence 智慧
    FAT: 'FAT', // fatigue 疲劳
    FAM: 'FAM', // FAME 名声
    TLT: 'TLT',
  };

  initial(rarity) {
    this.#data = {
      rarity,
      [this.TYPES.GDR]: this.random(0, 1, 0),
      [this.TYPES.AGE]: this.random(16, 24, 0),
      [this.TYPES.PKA]: this.random(24, 30, 0),
      [this.TYPES.PKT]: this.random(3, 6, 0),
      [this.TYPES.IMP]: this.random(1, 5),
      [this.TYPES.POT]: this.random(rarity * 30, Math.max(200, 50 + rarity * 40), 0),
      [this.TYPES.STR]: this.random(rarity * 2, Math.max(20, 5 + rarity * 4)),
      [this.TYPES.REC]: this.random(rarity * 2, Math.max(20, 5 + rarity * 4)),
      [this.TYPES.POW]: this.random(rarity * 2, Math.max(20, 5 + rarity * 4)),
      [this.TYPES.STA]: this.random(rarity * 2, Math.max(20, 5 + rarity * 4)),
      [this.TYPES.SKL]: this.random(rarity * 2, Math.max(20, 5 + rarity * 4)),
      [this.TYPES.SPD]: this.random(rarity * 2, Math.max(20, 5 + rarity * 4)),
      [this.TYPES.SPR]: this.random(rarity * 2, Math.max(20, 5 + rarity * 4)),
      [this.TYPES.INT]: this.random(rarity * 2, Math.max(20, 5 + rarity * 4)),
      [this.TYPES.FAT]: 0,
      [this.TYPES.FAM]: 0,
      [this.TYPES.TLT]: [],
    };
    this.calcCA();
  }

  get(prop) {
    return clone(this.#data[prop]);
  }

  set(prop, value) {
    this.#data[prop] = clone(value);
  }

  change(prop, value) {
    if (Array.isArray(value)) {
      for (const v of value) this.change(prop, Number(v));
      return;
    }
    if (prop === this.TYPES.TLT) {
      const v = this.#data[prop];
      if (value < 0) {
        const index = v.indexOf(value);
        if (index != -1) v.splice(index, 1);
      }
      if (!v.includes(value)) v.push(value);
    } else {
      if (Number(value)) {
        this.#data[prop] += Number(value);
      } else {
        for (const v of value.split(',')) {
          if (Number(v)) {
            this.#data[prop] += Number(v);
          } else {
            const [type, scale = 1] = v.split('*');
            this.#data[prop] += this.get(this.TYPES[type]) * scale;
          }
        }
      }
    }
  }
  
  effect(effects) {
    for (const prop in effects) this.change(prop, effects[prop]);
  }

  calcCA() {
    // todo: 不同项目增加系数
    const props = ['STR', 'REC', 'POW', 'STA', 'SKL', 'SPD', 'SPR', 'INT'];
    return props.reduce((sum, prop) => sum + this.#data.get(this.TYPES[prop]), 0);
  }

  random(low, high, fixed = 2) {
    return Number((low + Math.random() * (high - low)).toFixed(fixed));
  }
}

export default Athlete;
