import config from '../../config.cjs';
import { cmd } from '../command.js';

cmd({
  pattern: "chatbot",
  alias: ['lydia', 'lydea', 'answer', 'automreply'],
  desc: "Enable or disable the chatbot auto-reply",
  category: "owner",
  use: "chatbot [on/off]",
  filename: __filename,
  execute: async (m, Matrix) => {
    const botNumber = await Matrix.decodeJid(Matrix.user.id);
    const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
    const prefix = config.PREFIX;
    const cmdName = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmdName.length).trim();

    if (!isCreator) return m.reply("*🛑 OWNER COMMAND ONLY.*");

    let responseMessage;

    if (text === 'on') {
      config.CHAT_BOT = true;
      responseMessage = `✅ Chatbot has been *enabled* by command *${cmdName}*.`;
    } else if (text === 'off') {
      config.CHAT_BOT = false;
      responseMessage = `❌ Chatbot has been *disabled* by command *${cmdName}*.`;
    } else {
      responseMessage = `🧠 Usage:\n• \`${prefix}${cmdName} on\`\n• \`${prefix}${cmdName} off\``;
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error in chatbot command:", error);
      await Matrix.sendMessage(m.from, { text: '❗ Error processing your request.' }, { quoted: m });
    }
  }
});
