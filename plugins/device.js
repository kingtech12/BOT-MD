const { cmd } = require('../command');

cmd({
  pattern: 'device',
  desc: 'Detekte ki aparèy moun lan ap itilize',
  category: 'k1ng',
  react: '📲',
  filename: __filename
}, async (client, message) => {
  try {
    // Detekte aparèy moun lan
    const msgId = message.key.id;
    let deviceType = 'Enkonu';

    if (msgId?.startsWith('3EB0')) {
      deviceType = 'Android 📱';
    } else if (msgId?.startsWith('3EB1')) {
      deviceType = 'iPhone 🍎';
    } else if (msgId?.includes(':')) {
      deviceType = 'WhatsApp Web 💻';
    }

    await client.sendMessage(message.key.remoteJid, {
      text: `📲 Aparèy moun lan: *${deviceType}*`
    }, { quoted: message });

  } catch (err) {
    await client.sendMessage(message.key.remoteJid, {
      text: `_❌ Error: ${err.message}_`
    }, { quoted: message });
  }
});
