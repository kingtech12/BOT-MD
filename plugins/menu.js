const config = require('../config');
const moment = require('moment-timezone');
const { cmd, commands } = require('../command');

// Small caps function
function toSmallCaps(str) {
  const smallCaps = {
    A: 'ᴀ', B: 'ʙ', C: 'ᴄ', D: 'ᴅ', E: 'ᴇ', F: 'ғ', G: 'ɢ', H: 'ʜ',
    I: 'ɪ', J: 'ᴊ', K: 'ᴋ', L: 'ʟ', M: 'ᴍ', N: 'ɴ', O: 'ᴏ', P: 'ᴘ',
    Q: 'ǫ', R: 'ʀ', S: 's', T: 'ᴛ', U: 'ᴜ', V: 'ᴠ', W: 'ᴡ', X: 'x',
    Y: 'ʏ', Z: 'ᴢ'
  };
  return str.toUpperCase().split('').map(c => smallCaps[c] || c).join('');
}

// Delay function
function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

cmd({
  pattern: "menu",
  alias: ["🍷", "k1ng", "allmenu"],
  use: '.menu',
  desc: "Show all bot commands",
  category: "menu",
  react: "🍷",
  filename: __filename
},
async (k1ng, mek, m, { from, reply }) => {
  try {
    const sender = (m && m.sender) ? m.sender : (mek?.key?.participant || mek?.key?.remoteJid || 'unknown@s.whatsapp.net');
    const totalCommands = commands.length;
    const date = moment().tz("America/Port-au-Prince").format("dddd, DD MMMM YYYY");

    const uptime = () => {
      let sec = process.uptime();
      let h = Math.floor(sec / 3600);
      let m = Math.floor((sec % 3600) / 60);
      let s = Math.floor(sec % 60);
      return `${h}h ${m}m ${s}s`;
    };

    let k1ngmenu = `
╭━━━〔 *K1NG-XMD* 〕━━━╮
┃ 👤 *ᴜsᴇʀ* : @${m.sender.split("@")[0]}
┃ ⏱️ *ʀᴜɴᴛɪᴍᴇ* : ${uptime()}
┃ ⚙️ *ᴍᴏᴅᴇ* : ${config.MODE}
┃ 💠 *ᴘʀᴇғɪx* : [${config.PREFIX}]
┃ 📦 *Modules* : ${totalCommands}
┃ 👨‍💻 *ᴅᴇᴠ* : *©k1ng tech🌸💀*
┃ 🔖 *ᴠᴇʀsɪᴏɴ* : *1.0.0 K1NG💀*
┃ 📆 *Dᴀᴛᴇ* : ${date}
╰━━━━━━━━━━━━━━━━━━━╯`;
    
🌺  *WELCOME TO K1NG XMD* 🌸  
    
    // Organize commands by category
    let category = {};
    for (let cmd of commands) {
      if (!cmd.category) continue;
      if (!category[cmd.category]) category[cmd.category] = [];
      category[cmd.category].push(cmd);
    }

    // Build command list
    const keys = Object.keys(category).sort();
    for (let k of keys) {
      k1ngmenu += `\n\n┌── 『 ${k.toUpperCase()} MENU 』`;
      const cmds = category[k].filter(c => c.pattern).sort((a, b) => a.pattern.localeCompare(b.pattern));
      cmds.forEach((cmd) => {
        const usage = cmd.pattern.split('|')[0];
        k1ngmenu += `\n🌹├❃ ${config.PREFIX}${toSmallCaps(usage)}`;
      });
      k1ngmenu += `\n┗━━━━━━━━━━━━━━❃🇭🇹`;
    }

    // Envoyer le menu avec image
    await conn.sendMessage(from, {
      image: { url: 'https://files.catbox.moe/gtv9eh.jpeg' },
      caption: k1ngmenu,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: config.OWNER_NAME || '𝗞1𝗡𝗚-𝗫𝗠𝗗',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  // Send voice message
    await k1ng.sendMessage(from, {
      audio: { url: 'https://files.catbox.moe/downdu.mp4' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
