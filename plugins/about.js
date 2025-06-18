const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "about",
    alias: "dev",
    react: "👑",
    desc: "get owner dec",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let about = `
*╭┈───────────────•*
*ʜᴇʟʟᴏ 👋 ${pushname}*
*╰┈───────────────•*
*╭┈───────────────•*
*│  ◦* *ᴄʀᴇᴀᴛᴇᴅ ʙʏ: dawens boy*
*│  ◦* *ʀᴇᴀʟ ɴᴀᴍᴇ➩ Kibutsuji Muzan*
*│  ◦* *ɴɪᴄᴋɴᴀᴍᴇ➩ Kervens*
*│  ◦* *ᴀɢᴇ➩ ɴᴏᴛ ᴅᴇғɪɴᴇᴅ*
*│  ◦* *ᴄɪᴛʏ➩ ɴᴏᴛ ᴅᴇғɪɴᴇᴅ* 
*│  ◦* *ᴀ ᴘᴀꜱꜱɪᴏɴᴀᴛᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ᴅᴇᴠ*
*╰┈───────────────•*

*⪨ • K1NG-XMD - ᴘʀᴏᴊᴇᴄᴛ • ⪩*

*╭┈───────────────•*
*│  ◦* *✰➩DAWENS BOY x K1NG TECH*
*│  ◦* *✰➩ᴏɴʟʏ 2 ᴅᴇᴠᴇʟᴏᴘᴇʀ*
*╰┈───────────────•*

*•────────────•✱*
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ DAWENS BOY*
*•────────────•✱*
`
await conn.sendMessage(from, {
    image: { url: 'https://files.catbox.moe/avnlge.jpeg' },
    caption: about,
    contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '0029VbCHd5V1dAw132PB7M1B@newsletter', // ou ton JID actuel
            newsletterName: 'K1NG-XMD',
            serverMessageId: 143
        }
    }
}, { quoted: mek })

}catch(e){
console.log(e)
reply(`${e}`)
}
})
