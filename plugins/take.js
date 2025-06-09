import fs from 'fs/promises';
import config from '../../config.cjs';
import { cmd } from '../command.js';

cmd({
  pattern: "sticker",
  alias: ["s", "take"],
  desc: "Convert media to sticker or change sticker pack name",
  category: "sticker",
  use: "sticker | take <packname>",
  filename: __filename,
  execute: async (m, gss) => {
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const [cmd, ...args] = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ') : [];
    const command = cmd.toLowerCase();

    const defaultPackname = "K1NG-XMD";
    const defaultAuthor = "K1NG";

    const quoted = m.quoted || {};
    if (!quoted) return m.reply(`Reply to a media message to use the ${prefix + command} command.`);

    try {
      if (['sticker', 's'].includes(command)) {
        if (quoted.mtype !== 'imageMessage' && quoted.mtype !== 'videoMessage') {
          return m.reply(`Send/Reply with an image or video to convert into a sticker ${prefix + command}`);
        }

        const media = await quoted.download();
        if (!media) throw new Error('Failed to download media.');

        const filePath = `./${Date.now()}.${quoted.mtype === 'imageMessage' ? 'png' : 'mp4'}`;
        await fs.writeFile(filePath, media);

        if (quoted.mtype === 'imageMessage') {
          const stickerBuffer = await fs.readFile(filePath);
          await gss.sendImageAsSticker(m.from, stickerBuffer, m, {
            packname: defaultPackname,
            author: defaultAuthor
          });
        } else {
          await gss.sendVideoAsSticker(m.from, filePath, m, {
            packname: defaultPackname,
            author: defaultAuthor
          });
        }

        await fs.unlink(filePath);
      }

      if (command === 'take') {
        if (quoted.mtype !== 'stickerMessage') {
          return m.reply(`Please reply to a sticker to change its pack name.\nUsage: ${prefix}take dawens`);
        }

        const newPackname = args.join(' ') || defaultPackname;
        const stickerMedia = await quoted.download();
        if (!stickerMedia) throw new Error('Failed to download sticker.');

        await gss.sendImageAsSticker(m.from, stickerMedia, m, {
          packname: newPackname,
          author: defaultAuthor
        });
      }

    } catch (error) {
      console.error("Sticker error:", error);
      await m.reply('Something went wrong while processing your request.');
    }
  }
});
