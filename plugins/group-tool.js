const { cmd } = require('../command');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// remove only non-admin members
cmd({
    pattern: "removemembers",
    alias: ["kickall", "endgc", "endgroup"],
    desc: "Remove all non-admin members from the group.",
    react: "🎉",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, {
    from, groupMetadata, groupAdmins, isBotAdmins, senderNumber, reply, isGroup, isOwner, isAdmins
}) => {
    try {
        if (!isGroup) return reply("This command can only be used in groups.");

        if (!isOwner && !isAdmins) {
            return reply("Only the bot owner or group admins can use this command.");
        }

        if (!isBotAdmins) {
            return reply("I need to be an admin to execute this command.");
        }

        const allParticipants = groupMetadata.participants;
        const nonAdminParticipants = allParticipants.filter(member => !groupAdmins.includes(member.id));

        if (nonAdminParticipants.length === 0) {
            return reply("There are no non-admin members to remove.");
        }

        reply(`Starting to remove ${nonAdminParticipants.length} non-admin members...`);

        for (let participant of nonAdminParticipants) {
            try {
                await conn.groupParticipantsUpdate(from, [participant.id], "remove");
                await sleep(500);
            } catch (e) {
                console.error(`Failed to remove ${participant.id}:`, e);
            }
        }

        reply("Successfully removed all non-admin members from the group.");
    } catch (e) {
        console.error("Error removing non-admin users:", e);
        reply("An error occurred while trying to remove non-admin members. Please try again.");
    }
});

// remove only admins (excluding bot and owner)
cmd({
    pattern: "removeadmins",
    alias: ["kickadmins", "kickall3", "deladmins"],
    desc: "Remove all admin members from the group, excluding the bot and bot owner.",
    react: "🎉",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, {
    from, isGroup, senderNumber, groupMetadata, groupAdmins, isBotAdmins, reply, isOwner, isAdmins
}) => {
    try {
        if (!isGroup) return reply("This command can only be used in groups.");

        if (!isOwner && !isAdmins) {
            return reply("Only the bot owner or group admins can use this command.");
        }

        if (!isBotAdmins) {
            return reply("I need to be an admin to execute this command.");
        }

        const botOwner = conn.user.id.split(":")[0];
        const allParticipants = groupMetadata.participants;

        const adminParticipants = allParticipants.filter(member => 
            groupAdmins.includes(member.id) &&
            member.id !== conn.user.id &&
            member.id !== `${botOwner}@s.whatsapp.net`
        );

        if (adminParticipants.length === 0) {
            return reply("There are no admin members to remove.");
        }

        reply(`Starting to remove ${adminParticipants.length} admin members, excluding the bot and bot owner...`);

        for (let participant of adminParticipants) {
            try {
                await conn.groupParticipantsUpdate(from, [participant.id], "remove");
                await sleep(500);
            } catch (e) {
                console.error(`Failed to remove ${participant.id}:`, e);
            }
        }

        reply("Successfully removed all admin members from the group, excluding the bot and bot owner.");
    } catch (e) {
        console.error("Error removing admins:", e);
        reply("An error occurred while trying to remove admins. Please try again.");
    }
});

// remove all members except bot and owner
cmd({
    pattern: "removeall2",
    alias: ["kickall2", "endgc2", "endgroup2"],
    desc: "Remove all members and admins from the group, excluding the bot and bot owner.",
    react: "🎉",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, {
    from, isGroup, senderNumber, groupMetadata, isBotAdmins, reply, isOwner, isAdmins
}) => {
    try {
        if (!isGroup) return reply("This command can only be used in groups.");

        if (!isOwner && !isAdmins) {
            return reply("Only the bot owner or group admins can use this command.");
        }

        if (!isBotAdmins) {
            return reply("I need to be an admin to execute this command.");
        }

        const botOwner = conn.user.id.split(":")[0];
        const allParticipants = groupMetadata.participants;

        if (allParticipants.length === 0) {
            return reply("The group has no members to remove.");
        }

        const participantsToRemove = allParticipants.filter(
            participant => participant.id !== conn.user.id && participant.id !== `${botOwner}@s.whatsapp.net`
        );

        if (participantsToRemove.length === 0) {
            return reply("No members to remove after excluding the bot and bot owner.");
        }

        reply(`Starting to remove ${participantsToRemove.length} members, excluding the bot and bot owner...`);

        for (let participant of participantsToRemove) {
            try {
                await conn.groupParticipantsUpdate(from, [participant.id], "remove");
                await sleep(500);
            } catch (e) {
                console.error(`Failed to remove ${participant.id}:`, e);
            }
        }

        reply("Successfully removed all members, excluding the bot and bot owner, from the group.");
    } catch (e) {
        console.error("Error removing members:", e);
        reply("An error occurred while trying to remove members. Please try again.");
    }
});

// kickall private 

cmd({
  pattern: "purger",
  desc: "Kick all group members using a group link (bot must be admin)",
  category: "group",
    react: ["💀"],
  filename: __filename
}, async (conn, m, store, {
  args,
  reply
}) => {
  const text = args[0];

  if (!text || !text.includes("chat.whatsapp.com/")) {
    return reply("❌ Please provide a valid WhatsApp group link.\n\nExample:\n.kickall https://chat.whatsapp.com/XXXX");
  }

  const inviteCode = text.split("chat.whatsapp.com/")[1].trim();

  try {
    // Try to join the group
    let groupJid;
    try {
      groupJid = await conn.groupAcceptInvite(inviteCode);
    } catch (e) {
      const res = await conn.groupGetInviteInfo(inviteCode);
      groupJid = res.id + "@g.us";
    }

    // Small delay to ensure group metadata is up-to-date
    await new Promise(r => setTimeout(r, 2000));
    const metadata = await conn.groupMetadata(groupJid);

    const botNumber = conn.decodeJid(conn.user.id);
    const botIsAdmin = metadata.participants.find(p => p.id === botNumber && p.admin);

    if (!botIsAdmin) {
      return reply("❌ Bot is not an admin in that group.");
    }

    const membersToKick = metadata.participants
      .filter(p => p.id !== botNumber && !p.admin)
      .map(p => p.id);

    if (membersToKick.length === 0) {
      return reply("✅ No non-admin members to kick.");
    }

    reply(`⏳ Kicking ${membersToKick.length} members from *${metadata.subject}*...`);

    for (let user of membersToKick) {
      await conn.groupParticipantsUpdate(groupJid, [user], "remove");
      await new Promise(resolve => setTimeout(resolve, 1500)); // avoid rate limits
    }

    return reply(`✅ Successfully kicked all non-admin members from *${metadata.subject}*`);
  } catch (e) {
    console.error(e);
    return reply("❌ Failed to kick members. Make sure the link is valid and the bot has admin rights.");
  }
});
