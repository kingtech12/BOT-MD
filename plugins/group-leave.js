const { sleep } = require('../lib/functions');
const config = require('../config');
const { cmd, commands } = require('../command');

// DybyTech 

cmd({
    pattern: "leave",
    alias: ["left", "leftgc", "leavegc"],
    desc: "Leave the group",
    react: "🎉",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply
}) => {
    try {
        const botOwner = conn.user.id.split(":")[0]; 
        const isOwner = senderNumber === botOwner;

        if (!isGroup) {
            return reply("This command can only be used in groups.");
        }

        if (!isOwner) {
            return reply("Only the bot owner can use this command.");
        }

        reply("Leaving group...");
        await sleep(1500);
        await conn.groupLeave(from);
        reply("Goodbye! 🚶");
    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});
