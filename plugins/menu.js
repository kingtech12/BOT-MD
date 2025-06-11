const config = require('../config');
const moment = require('moment-timezone');
const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
  pattern: "menu",
  alias: ["allmenu", "gotar"],
  use: '.menu',
  desc: "Show all bot commands",
  category: "menu",
  react: "🍷",
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {
  try {
    const totalCommands = commands.length;
    const date = moment().tz("America/Port-au-Prince").format("dddd, DD MMMM YYYY");

    const uptime = () => {
      let sec = process.uptime();
      let h = Math.floor(sec / 3600);
      let m = Math.floor((sec % 3600) / 60);
      let s = Math.floor(sec % 60);
      return `${h}h ${m}m ${s}s`;
    };

    // Nouveau style de menu
    let menuText = `
🌸╭━━━〔 *K1NG-XMD* 〕━━━╮
🌸┃ 👤 *Utilisateur* : @${m.sender.split("@")[0]}
🌸┃ ⏱️ *Uptime* : ${uptime()}
🌸┃ ⚙️ *Mode* : ${config.MODE}
🌸┃ 💠 *Préfixe* : [${config.PREFIX}]
🌸┃ 📦 *Modules* : ${totalCommands}
🌸┃ 👨‍💻 *Dev* : ©k1ng tech🌸💀
🌸┃ 🔖 *Version* : 1.0.0 K1NG💀🩸
🌸┃ 📆 *Date* : ${date}
╰━━━━━━━━━━━━━━━━━━━╯`;

    // Organisation par catégorie
    let category = {};
    for (let cmd of commands) {
      if (!cmd.category) continue;
      if (!category[cmd.category]) category[cmd.category] = [];
      category[cmd.category].push(cmd);
    }

    const keys = Object.keys(category).sort();
    for (let k of keys) {
      menuText += `\n\n🩸『 *${k.toUpperCase()}* 』\n`;
      const cmds = category[k].filter(c => c.pattern).sort((a, b) => a.pattern.localeCompare(b.pattern));
      cmds.forEach((cmd) => {
        const usage = cmd.pattern.split('|')[0];
        menuText += `🌺 *${config.PREFIX}${usage}*\n`;
      });
      menuText += `━━━━━━━━━━━━━━━`;
    }

    // Envoyer le menu avec image
    await conn.sendMessage(from, {
      image: { url: 'https://files.catbox.moe/ngnch5.jpeg' },
      caption: menuText,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: config.OWNER_NAME || 'K1NG-XMD',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
          
