import config from '../../config.cjs';
import { cmd } from '../command';

cmd({
  pattern: "anticall",
  alias: [],
  desc: "Enable or disable anti-call",
  category: "owner",
  use: "anticall on/off",
  filename: __filename
},
async (conn, m, msg, { from, reply }) => {
  const botNumber = await conn.decodeJid(conn.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const text = msg.body.slice(config.PREFIX.length + "anticall".length).trim();

  if (!isCreator) return reply("*Only admin*");

  let res = "";
  if (text === 'on') {
    config.REJECT_CALL = true;
    res = "✅ Anti-Call is now enabled.";
  } else if (text === 'off') {
    config.REJECT_CALL = false;
    res = "❌ Anti-Call is now disabled.";
  } else {
    res = "Usage:\n- anticall on\n- anticall off";
  }

  await conn.sendMessage(from, { text: res }, { quoted: m });
});
