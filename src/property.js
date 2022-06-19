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
    };

    #timeData;
    #data;

    initial({time}) {

        this.#timeData = time;
        for(const a in time) {
            time[a].event = time[a].event?.split(',').map(v=>{
                const value = v.split('*').map(n=>Number(n));
                if(value.length==1) value.push(1);
                return value;
            });
        }
    }

    restart(data) {
        this.#data = {
            [this.TYPES.TIME]: -1,
            [this.TYPES.PRC]: 0,
            [this.TYPES.HEL]: 0,
            [this.TYPES.ENC]: 0,
            [this.TYPES.MAR]: 0,
            [this.TYPES.REL]: 0,
            [this.TYPES.LUK]: 1,
            [this.TYPES.TLT]: [],
            [this.TYPES.EVT]: [],
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
        this.#data[prop] += Number(value);
        // switch(prop) {
        //     case this.TYPES.TIME:
        //     case this.TYPES.CHR:
        //     case this.TYPES.INT:
        //     case this.TYPES.STR:
        //     case this.TYPES.MNY:
        //     case this.TYPES.SPR:
        //     case this.TYPES.LIF:
        //         this.#data[prop] += Number(value);
        //         break;
        //     case this.TYPES.TLT:
        //     case this.TYPES.EVT:
        //         const v = this.#data[prop];
        //         if(value<0) {
        //             const index = v.indexOf(value);
        //             if(index!=-1) v.splice(index,1);
        //         }
        //         if(!v.includes(value)) v.push(value);
        //         break;
        //     default: return;
        // }
    }

    effect(effects) {
        for(const prop in effects)
            this.change(prop, Number(effects[prop]));
    }

    isEnd() {
        // 先默认4年
        return this.get(this.TYPES.TIME) > 4 * 52;
    }

    timeNext() {
        this.change(this.TYPES.TIME, 1);
        const time = this.get(this.TYPES.TIME);
        const {event, talent} = this.getTimeData(time);
        return {time, event, talent};
    }

    getTimeData(time) {
        return clone(this.#timeData[time]);
    }

}

export default Property;