const axios = require('axios');
const { cmd } = require('../command');
const config = require('../../config.cjs');

cmd({
  pattern: "anime",
  alias: [],
  desc: "Search for anime by name",
  category: "fun",
  use: ".anime <anime name>",
  react: "🎌",
  filename: __filename
},
async (conn, mek, m, { args, reply }) => {
  const text = args.join(" ");
  if (!text) return reply('Please provide an anime name after the command.');

  try {
    const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${text}&limit=1`);
    const anime = res.data.data[0];

    if (!anime) return reply('❌ No anime found with that name.');

    const animeInfo = `*🎌 Anime:* ${anime.title}
*⭐ Score:* ${anime.score || 'N/A'}
*📚 Genres:* ${anime.genres.map(g => g.name).join(', ')}
*📝 Synopsis:* ${anime.synopsis || 'N/A'}
🔗 *Link:* ${anime.url}`;

    await conn.sendMessage(m.from, { image: { url: anime.images.jpg.image_url }, caption: animeInfo }, { quoted: m });
  } catch (e) {
    console.error(e);
    reply('❌ An error occurred while fetching anime data.');
  }
});
