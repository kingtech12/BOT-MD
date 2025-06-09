const { cmd } = require('../command');
const config = require('../../config.cjs');

cmd({
  pattern: "sudo",
  alias: [],
  desc: "Voye kontak owner bot la",
  category: "owner",
  use: ".sudo",
  react: "👑",
  filename: __filename
},
async (conn, mek, m, { reply }) => {
  try {
    await conn.sendContact(m.from, [config.SUDO_NUMBER], m);
    await m.react("✅");
  } catch (error) {
    console.error('❌ Erè:', error);
    await reply('❌ Pa kapab voye kontak la.');
    await m.react("❌");
  }
});
