const { cmd } = require('../command');
const { sleep } = require('../lib/functions2');

cmd({
  pattern: "broadcast",
  alias: ["bcgroup", "bc"],
  category: "owner",
  desc: "Send a text/media broadcast to all groups",
  filename: __filename,
  use: "<text or reply to a media>"
}, async (conn, message, m, { q, isOwner, reply }) => {
  try {
    if (!isOwner) return reply("❌ Only the *bot owner* can use this command.");
    if (!q && !message.quoted) return reply("❌ Provide a text or reply to an image/video!");

    const groupsData = await conn.groupFetchAllParticipating();
    const groupIds = Object.keys(groupsData);
    const failed = [];

    reply(`📣 Broadcasting to *${groupIds.length}* groups...\n⏳ Please wait a moment.`);

    for (const groupId of groupIds) {
      try {
        await sleep(1500);

        if (message.quoted && message.quoted.mtype?.includes("image")) {
          const buffer = await message.quoted.download();
          await conn.sendMessage(groupId, {
            image: buffer,
            caption: q || '',
          });
        } else if (message.quoted && message.quoted.mtype?.includes("video")) {
          const buffer = await message.quoted.download();
          await conn.sendMessage(groupId, {
            video: buffer,
            caption: q || '',
          });
        } else {
          await conn.sendMessage(groupId, {
            text: `*📢 Broadcast:*\n\n${q}`
          });
        }

      } catch (err) {
        failed.push(groupId);
        console.error(`❌ Error with ${groupId}:`, err.message);
      }
    }

    reply(`✅ Broadcast finished.\n\n*Success:* ${groupIds.length - failed.length}\n*Failed:* ${failed.length}${failed.length > 0 ? `\n\nFailed groups:\n${failed.join("\n")}` : ""}`);

  } catch (err) {
    console.error("Broadcast Error:", err);
    await m.error(`❌ Error: ${err.message}`, err);
  }
});
