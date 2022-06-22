import { clone } from "./functions/util.js";
import { checkCondition } from "./functions/condition.js";

class Event {
  constructor() {}

  #events;
  #randomEvents;

  initial({ events }) {
    this.#events = events;
    const randomEvents = [];
    for (const event in events) {
      if (events[event].isRandom) {
        randomEvents.push(events[event]);
      }
    }
    this.#randomEvents = randomEvents.sort(
      (a, b) => a.probability - b.probability
    );
  }

  check(eventId, property) {
    const { requirements, opposites } = this.get(eventId);
    if (opposites && checkCondition(property, opposites)) return false;
    if (requirements) return checkCondition(property, requirements);
    return true;
  }

  checkAll(events, property) {
    let valid = true;
    for (const event in events) {
      valid &= this.check(events[event].id, property);
    }
    return valid;
  }

  get(eventId) {
    const event = this.#events[eventId];
    if (!event) throw new Error(`[ERROR] No Event[${eventId}]`);
    return clone(event);
  }

  information(eventId) {
    const { event: description } = this.get(eventId);
    return { description };
  }

  do(eventId) {
    const { playerEffects, effects, event: description } = this.get(eventId);
    return { playerEffects, effects, description };
  }

  random(events, property) {
    const randomEvents = this.#randomEvents;
    const luck = property.get(property.TYPES.LUK);
    for (const event in randomEvents) {
      if (
        this.checkAll(events, property) &&
        Math.random() - ((randomEvents[event].modify || 0) * luck) / 100 <
          randomEvents[event].probability
      ) {
        events.push(clone(randomEvents[event]));
      }
      // todo: 暂时设定最多10个事件，可以有天赋改变事件数
      if (events.length > 9) {
        return events;
      }
    }
    return events;
  }
}

export default Event;
