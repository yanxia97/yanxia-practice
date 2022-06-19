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
    });
    let trajectory;
    do{
        try{
            trajectory = life.next();
        } catch(e) {
            console.error(e);
            // debugger
            throw e;
        }
        const { age, content } = trajectory;
        console.debug(`---------------------------------`);
        console.debug(`-- ${age} 岁`);
        console.debug('   ',
            content.map(
                ({type, description, rate, name, postEvent}) => {
                    switch(type) {
                        case 'TLT':
                            return `天赋【${name}】发动：${description}`;
                        case 'EVT':
                            return description + (postEvent?`\n    ${postEvent}`:'');
                    }
                }
            ).join('\n    ')
        );
    } while(!trajectory.isEnd)
    // debugger;
}

debug();