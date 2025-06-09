const { cmd } = require('../command');
const config = require('../config');
const prefix = config.PREFIX;
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions2');
const { writeFileSync } = require('fs');
const path = require('path');

cmd({
    pattern: "linkgroup",
    alias: ["link", "invite", "grouplink", "satan-link"],
    desc: "Get group invite link.",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, args, q, isGroup, sender, reply }) => {
    try {
        if (!isGroup) return reply("❌ This feature is only available in groups.");

        const senderNumber = sender.split('@')[0];
        const botNumber = conn.user.id.split(':')[0];

        const groupMetadata = isGroup ? await conn.groupMetadata(from) : '';
        const groupAdmins = groupMetadata ? groupMetadata.participants.filter(member => member.admin) : [];
        const isBotAdmins = isGroup ? groupAdmins.some(admin => admin.id === botNumber + '@s.whatsapp.net') : false;
        const isAdmins = isGroup ? groupAdmins.some(admin => admin.id === sender) : false;

        if (!isBotAdmins) return reply("❌ I need to be an admin to fetch the group link.");
        if (!isAdmins) return reply("❌ Only group admins or the bot owner can use this command.");

        const inviteCode = await conn.groupInviteCode(from);
        if (!inviteCode) return reply("❌ Failed to retrieve the invite code.");

        const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;
        const ownerJid = groupMetadata.owner || '';
        const groupOwner = ownerJid ? '@' + ownerJid.split('@')[0] : 'Unknown';
        const groupName = groupMetadata.subject || 'Unknown';
        const groupId = groupMetadata.id || from;
        const memberCount = groupMetadata.participants.length;

        const infoText = `╭──〔 *GROUP LINK* 〕──⬣\n` +
                         `┃ 📍 *Name:* ${groupName}\n` +
                         `┃ 👑 *Owner:* ${groupOwner}\n` +
                         `┃ 🆔 *ID:* ${groupId}\n` +
                         `┃ 🔗 *Invite Link:* ${inviteLink}\n` +
                         `┃ 👥 *Members:* ${memberCount}\n` +
                         `╰──────────────⬣\n\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ BLACK ᴛᴇᴄʜ*`;

        return conn.sendMessage(from, {
            text: infoText,
            mentions: [ownerJid]
        }, { quoted: m });

    } catch (error) {
        console.error("❌ Error in linkgroup command:", error);
        reply(`⚠️ An error occurred: ${error.message || "Unknown error"}`);
    }
});
