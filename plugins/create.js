const { cmd } = require('../command');
const config = require('../config');

cmd({
  pattern: "create",
  desc: "Create WhatsApp group",
  category: "group",
  use: "create GroupName [add number1,number2,...]",
  filename: __filename,
  async execute(m, Matrix) {
    const prefix = config.PREFIX;
    const botNumber = await Matrix.decodeJid(Matrix.user.id);
    const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : '';
    if (!isCreator) return m.reply("🚫 *Only the bot owner can use this command.*");

    const args = m.body.slice(prefix.length + cmd.length).trim();
    if (!args) {
      return Matrix.sendMessage(m.from, {
        text: `
╭━━〔 *GROUP CREATION TOOL* 〕━━⬣
┃
┃📌 *How to use:*
┃
┃➤ ${prefix}create *GroupName*
┃     ↪ Creates a group without members
┃
┃➤ ${prefix}create *GroupName* add *num1,num2,...*
┃     ↪ Creates a group and adds members
┃
┃📍 *Examples:*
┃▪ ${prefix}create K1NG XMD 
┃▪ ${prefix}create K1NG XMD add 2299001122,2298123456
┃
╰━━━〔 © K1NG-XMD 〕━━⬣
        `.trim()
      }, { quoted: m });
    }

    let groupName = args;
    let numbersToAdd = [];

    if (args.includes("add")) {
      const [namePart, numberPart] = args.split("add");
      groupName = namePart.trim();
      numbersToAdd = numberPart
        .split(",")
        .map(num => num.replace(/[^0-9]/g, '') + "@s.whatsapp.net")
        .filter(id => id.length > 15);
    }

    try {
      const response = await Matrix.groupCreate(groupName, []);
      const newGroupJid = response.gid;

      if (numbersToAdd.length > 0) {
        await Matrix.groupParticipantsUpdate(newGroupJid, numbersToAdd, "add");
      }

      await Matrix.sendMessage(m.from, {
        text: `
⬡ *Group created successfully!*
⬡ *Group Name:* ${groupName}
⬡ *Group ID:* ${newGroupJid}
⬡ *Members added:* ${numbersToAdd.length > 0 ? numbersToAdd.length : "None"}

> MADE BY K1NG-XMD
        `.trim()
      }, { quoted: m });

    } catch (err) {
      console.error("Group creation error:", err);
      return m.reply("❌ *An error occurred while creating the group.*\nPlease check permissions or number format.");
    }
  }
});
