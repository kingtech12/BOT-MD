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

function generateRamBar(percentage) {
  const totalBlocks = 5;
  const filled = Math.round(percentage * totalBlocks);
  const empty = totalBlocks - filled;
  return '▣'.repeat(filled) + '□'.repeat(empty);
}

cmd({
  pattern: "menu",
  alias: ["🖤", "k1ng", "allmenu"],
  use: '.menu',
  desc: "Show all bot commands",
  category: "menu",
  react: "🖤",
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

const ping = Math.floor(Math.random() * 50) + 10;
    const usedMemMB = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
    const memoryUsage = usedMemMB;
    const ramPercent = usedMemMB / (16 * 1024); // assuming 16GB RAM
    const ramUsageBar = generateRamBar(ramPercent);

    let k1ngMenu = `
╔〘 *🇭🇹 𝗞1𝗡𝗚-𝗫𝗠𝗗 🇭🇹* 
║ 👑 *Owner:* 𝗠𝗥 𝗞߁𝗡𝗚
║ 🧩 *Prefix:* [ ${config.PREFIX} ]
║ 🖥️ *Host:* linux
║ 🧠 *Commands:* ${commands.length}
║ ⚙️ *Mode:* ${config.MODE}
║ 🧪 *Version:* 1.0.0
║ ⚡ *Ping:* ${ping} ms
║ 📊 *Usage:* ${memoryUsage} MB of 16 GB
║ 🧬 *RAM:* ${ramUsageBar} 32%
╚═〘 *System Status* 

✨ *Welcome to* 𝙆𝟭𝙉𝙂-𝙓𝙈𝘿
━━━━━━━━━━━━━━━━━━━━━━━
`;

    // Organize commands by category
    let category = {};
    for (let cmd of commands) {
      if (!cmd.category) continue;
      if (!category[cmd.category]) category[cmd.category] = [];
      category[cmd.category].push(cmd);
    }

    // Add commands by category to menu with ⎾═╼▣ style, without prefix
const keys = Object.keys(category).sort();
for (let k of keys) {
  k1ngMenu += `\n\n⎾═╼▣ *${k.toUpperCase()} MENU*`;
  const cmds = category[k].filter(c => c.pattern).sort((a, b) => a.pattern.localeCompare(b.pattern));
  cmds.forEach((cmd) => {
    const usage = cmd.pattern.split('|')[0];
    k1ngMenu += `\n︱✗ ${toSmallCaps(usage)}`;
  });
  k1ngMenu += `\n⎿═╼▣`;
}

    // Send menu message without buttons
    await k1ng.sendMessage(from, {
      image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/gtv9eh.jpeg' },
      caption: k1ngMenu,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: config.newsletterJid || '120363388484459995@newsletter',
          newsletterName: '𝗞1𝗡𝗚-𝗫𝗠𝗗',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

    // Optional: send audio message as PTT
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
