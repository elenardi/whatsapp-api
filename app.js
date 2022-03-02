const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
// const fs = require('fs');


// const SESSION_FILE_PATH = './whatsapp-session.json';

// let sessionCfg;
// if (fs.existsSync(SESSION_FILE_PATH)){
//     sessionCfg = require(SESSION_FILE_PATH);
// }

// const client = new Client({puppeteer: {headless: true}, session: sessionCfg});

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr);
});

// client.on('authenticated', (session) => {
//     console.log('AUTHENTICATED', session);
//     sessionCfg = session;
//     fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err){
//         if (err) {
//             console.error(err);
//         }
//     })
// });

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();