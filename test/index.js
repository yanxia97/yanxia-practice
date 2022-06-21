import { readFile } from 'fs/promises';
import Life from '../src/life.js'

global.json = filePath => readFile(filePath);

async function debug() {

    const life = new Life();
    await life.initial();

    life.restart({
        PRC: 5,                     // 训练 practice PRC
        HEL: 5,                     // 治疗 heal HEL
        ENC: 5,                     // 激励 encourage ENC
        MAR: 5,                     // 商业 Marketability MAR
        REL: 5,                     // 关系 relationship REL
        LUK: 5,                     // 运气 luck LUK
        MNY: 10,                 // 资金 money MNY
    });
    let trajectory;
    do{
        try{
            trajectory = life.next([10004,10008,10008]);
        } catch(e) {
            console.error(e);
            // debugger
            throw e;
        }
        const { time, content } = trajectory;
        console.debug(`---------------------------------`);
        console.debug(`-- ${time} 周`);
        // console.debug('   ',
        //     content.map(
        //         ({type, description, name}) => {
        //             switch(type) {
        //                 case 'TLT':
        //                     return `天赋【${name}】发动：${description}`;
        //                 case 'EVT':
        //                     return description;
        //             }
        //         }
        //     ).join('\n    ')
        // );
    } while(!trajectory.isEnd)
    // debugger;
}

debug();