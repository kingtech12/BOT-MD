const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "sudo",
  alias: ["owner", "dev"],
  desc: "Send contact of the bot owner",
  category: "owner",
  use: '.sudo',
  react: "📞",
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {
  try {
    const sudoRaw = config.SUDO_NUMBER;
    if (!sudoRaw) return reply("SUDO_NUMBER not set in config.");

    const ownerNumbers = sudoRaw.split(',').map(n => n.trim());
    await conn.sendContact(from, ownerNumbers, m);
    await m.React("✅");
  } catch (error) {
    console.error('Error sending owner contact:', error);
    await reply('Failed to send owner contact.');
    await m.React("❌");
  }
});
