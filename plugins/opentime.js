const config = require('../config');
const { cmd } = require('../command');

// Parse time duration from arguments
function parseDuration(value, unit) {
    const multipliers = {
        second: 1000,
        seconds: 1000,
        minute: 60000,
        minutes: 60000,
        hour: 3600000,
        hours: 3600000,
        day: 86400000,
        days: 86400000
    };
    if (isNaN(value)) return null;
    return multipliers[unit.toLowerCase()] ? parseInt(value) * multipliers[unit.toLowerCase()] : null;
}

cmd({
    pattern: "opentime",
    react: "🔖",
    desc: "Temporarily open group for a specific time",
    category: "group",
    use: ".opentime 10 minutes",
    filename: __filename
}, async (conn, mek, m, { from, args, isGroup, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply("This command only works in groups.");
        if (!isAdmins) return reply("Only group admins can use this command.");

        const timer = parseDuration(args[0], args[1]);
        if (!timer) return reply("*Choose a valid unit:*\nseconds, minutes, hours, days\n\n*Example:*\n10 minutes");

        reply(`*Group will be opened for ${args[0]} ${args[1]}.*`);
        await conn.groupSettingUpdate(from, 'not_announcement');

        setTimeout(async () => {
            await conn.groupSettingUpdate(from, 'announcement');
            await conn.sendMessage(from, { text: `*⏱️ TIME'S UP*\nGroup is now closed. Only admins can send messages. 🔐` });
        }, timer);

        await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });
    } catch (e) {
        reply("*An error occurred while opening the group.*");
        console.error(e);
    }
});

cmd({
    pattern: "closetime",
    react: "🔖",
    desc: "Temporarily close group for a specific time",
    category: "group",
    use: ".closetime 10 minutes",
    filename: __filename
}, async (conn, mek, m, { from, args, isGroup, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply("This command only works in groups.");
        if (!isAdmins) return reply("Only group admins can use this command.");

        const timer = parseDuration(args[0], args[1]);
        if (!timer) return reply("*Choose a valid unit:*\nseconds, minutes, hours, days\n\n*Example:*\n10 minutes");

        reply(`*Group will be closed for ${args[0]} ${args[1]}.*`);
        await conn.groupSettingUpdate(from, 'announcement');

        setTimeout(async () => {
            await conn.groupSettingUpdate(from, 'not_announcement');
            await conn.sendMessage(from, { text: `*⏱️ TIME'S UP*\nGroup is now open. All members can send messages. 🔓` });
        }, timer);

        await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });
    } catch (e) {
        reply("*An error occurred while closing the group.*");
        console.error(e);
    }
});
