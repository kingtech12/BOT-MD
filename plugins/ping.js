const { cmd } = require('../command');
const moment = require('moment-timezone');

cmd({
  pattern: 'ping',
  desc: "Check bot's response time with stylish output.",
  category: 'main',
  react: '⚡',
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const start = Date.now();
    const sentMsg = await conn.sendMessage(from, { text: '⏳ Pinging...' });
    const end = Date.now();
    const ping = end - start;

    const time = moment().tz('America/Port-au-Prince').format('YYYY-MM-DD HH:mm:ss');

    const responseText = `
⚡ *K1NG-XMD Bot Speed Test* ⚡

📶 Response time: *${ping} ms*
⏰ Server time: *${time}*

_Thank you for using K1NG-XMD!_
    `.trim();

    await conn.sendMessage(from, { text: responseText }, { quoted: sentMsg });

  } catch (error) {
    console.error(error);
    reply(`❌ Error: ${error.message || error}`);
  }
});
