const { cmd } = require('../command');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

cmd({
  pattern: 'pretem',
  desc: 'Return sticker with user\'s WhatsApp name as author and packname',
  category: 'fun',
  react: '🎁',
  filename: __filename
}, async (bot, mek, m, { quoted }) => {
  try {
    if (!quoted || !quoted.message || (!quoted.message.imageMessage && !quoted.message.stickerMessage)) {
      return await bot.sendMessage(mek.key.remoteJid, {
        text: '❌ Reply to a sticker or image with .pretem'
      }, { quoted: mek });
    }

    const media = await bot.downloadMediaMessage(quoted);
    const userName = mek.pushName || 'Anonymous';

    const sticker = new Sticker(media, {
      pack: userName,       // packname = user's name
      author: userName,     // author = user's name
      type: StickerTypes.FULL,
      quality: 80,
    });

    const buffer = await sticker.toBuffer();
    await bot.sendMessage(mek.key.remoteJid, { sticker: buffer }, { quoted: mek });

  } catch (err) {
    console.error(err);
    await bot.sendMessage(mek.key.remoteJid, {
      text: '❌ Error while processing sticker.'
    }, { quoted: mek });
  }
});
