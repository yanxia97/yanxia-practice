import Property from './property.js';
import Event from './event.js';
import Athletes from './athletes.js';
// import Talent from './talent.js';

class Life {
  constructor() {
    this.#property = new Property();
    this.#event = new Event();
    this.#athletes = new Athletes();
    // this.#talent = new Talent();
  }

  #property;
  #event;
  #athletes;
  // #talent;
  // #triggerTalents;

  async initial() {
    // const talents = JSON.parse(await json('data/talents.json'));
    const events = JSON.parse(await json('public/data/events.json'));

    // this.#talent.initial({talents});
    this.#event.initial({ events });
  }

  restart(allocation) {
    // this.#triggerTalents = new Set();
    this.#property.restart(allocation);
    // this.doTalent();
  }

  next(choices) {
    const events = choices.map((choice) => this.#event.get(choice));
    const eventContent = this.doEvent(
      this.#event.random(events, this.#property),
    );
    // const talentContent = this.doTalent(talent);

    const isEnd = this.#property.isEnd();

    // const content = [talentContent, eventContent].flat();
    const content = eventContent;
    const { time } = this.#property.timeNext();
    return { time, content, isEnd };
  }

  // doTalent(talents) {
  //     if(talents) this.#property.change(this.#property.TYPES.TLT, talents);
  //     talents = this.#property.get(this.#property.TYPES.TLT)
  //         .filter(talentId=>!this.#triggerTalents.has(talentId));

  //     const contents = [];
  //     for(const talentId of talents) {
  //         const result = this.#talent.do(talentId);
  //         if(!result) continue;
  //         this.#triggerTalents.add(talentId);
  //         const { effect, name, desctiption } = result;
  //         contents.push({
  //             type: this.#property.TYPES.TLT,
  //             name,
  //             rate,
  //             desctiption,
  //         })
  //         if(!result.effect) continue;
  //         this.#property.effect(effect);
  //     }
  //     return contents;
  // }

  doEvent(events) {
    const contents = [];
    for (let event in events) {
      const { isSearch, rarity, playerEffects, effects, description } = this.#event.do(events[event].id);
      this.#property.effect(playerEffects);
      this.#athletes.effect(effects, this.#property.get('PRC'));
      if (isSearch) {
        this.#athletes.draw(rarity);
      }
      const content = {
        type: this.#property.TYPES.EVT,
        description,
      };
      contents.push(content);
    }
    return contents;
  }
}

export default Life;
