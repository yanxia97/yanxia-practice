import { clone } from './functions/util.js';

class Property {
    constructor() {}

    TYPES = {
        TIME: "TIME",
        PRC: "PRC",
        HEL: "HEL",
        ENC: "ENC",
        MAR: "MAR",
        REL: "REL",
        LUK: "LUK",
        MNY: "MNY",
        TLT: "TLT",
        EVT: "EVT",
        FAIL: "FAIL",
    };

    // #timeData;
    #data;

    // initial({time}) {
    //     this.#timeData = time;
    //     // for(const a in time) {
    //     //     const { event } = time[a]
    //     //     time[a] = { event }
    //     // }
    // }

    restart(data) {
        this.#data = {
            [this.TYPES.TIME]: 0,
            [this.TYPES.PRC]: 0,
            [this.TYPES.HEL]: 0,
            [this.TYPES.ENC]: 0,
            [this.TYPES.MAR]: 0,
            [this.TYPES.REL]: 0,
            [this.TYPES.LUK]: 0,
            [this.TYPES.MNY]: 0,
            [this.TYPES.FAIL]: 0,
            [this.TYPES.TLT]: [],
        };
        for(const key in data)
            this.change(key, data[key]);
    }

    get(prop) {
        return clone(this.#data[prop]);
    }

    set(prop, value) {
        this.#data[prop] = clone(value);
    }

    change(prop, value) {
        if(Array.isArray(value)) {
            for(const v of value)
                this.change(prop, Number(v));
            return;
        }
        if (prop === this.TYPES.TLT) {
            const v = this.#data[prop];
            if(value<0) {
                const index = v.indexOf(value);
                if(index!=-1) v.splice(index,1);
            }
            if(!v.includes(value)) v.push(value);
        } else {
            if (Number(value)) {
                this.#data[prop] += Number(value);
            } else {
                for(const v of value.split(',')) {
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

    effect({effects, playerEffects}) {
        // for(const prop in effects)
        //     this.change(prop, Number(effects[prop]));
        for(const prop in playerEffects)
            this.change(prop, playerEffects[prop]);
    }

    isEnd() {
        // todo: 默认4年，时间可变
        if (this.get(this.TYPES.MNY) < 0) {
            this.#data.FAIL += 1
        } else {
            this.#data.FAIL = 0
        }
        return this.get(this.TYPES.TIME) > 4 * 52 - 2 || this.get(this.TYPES.FAIL) > 9;
    }

    timeNext() {
        this.change(this.TYPES.TIME, 1);
        const time = this.get(this.TYPES.TIME);
        // const {event, talent} = this.getTimeData(time);
        // return {time, event, talent};
        // const {event} = this.getTimeData(time);
        return { time }
    }

    // getTimeData(time) {
    //     return clone(this.#timeData[time]);
    // }

}

export default Property;