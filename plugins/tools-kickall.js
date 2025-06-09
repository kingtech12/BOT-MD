const { cmd } = require('../command');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

cmd({
    pattern: "kickall",
    desc: "Remove all non-admin members from the group.",
    react: "❌",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, {
    from, groupMetadata, groupAdmins, isBotAdmins, senderNumber, reply, isGroup, isOwner, isAdmins
}) => {
    try {
        if (!isGroup) return reply("This command can only be used in groups.");

        if (!isOwner && !isAdmins) {
            return reply("Only the owner or group admins can use this command.");
        }

        if (!isBotAdmins) {
            return reply("I need to be an admin to perform this action.");
        }

        const nonAdmins = groupMetadata.participants.filter(p => !groupAdmins.includes(p.id));

        if (nonAdmins.length === 0) {
            return reply("There are no non-admin members to remove.");
        }

        reply(`Removing ${nonAdmins.length} non-admin members...`);

        for (let p of nonAdmins) {
            try {
                await conn.groupParticipantsUpdate(from, [p.id], "remove");
                await sleep(2000);
            } catch (e) {
                console.error(`Failed to remove ${p.id}:`, e);
            }
        }

        reply("All non-admin members have been removed.");
    } catch (e) {
        console.error("Error:", e);
        reply("An error occurred while removing members.");
    }
});
