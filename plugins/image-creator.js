const { cmd } = require('../command');
const axios = require('axios');
const FormData = require('form-data');

// Helper: download image buffer from replied message
async function getBufferFromQuoted(quoted, reply) {
  if (!quoted) return reply("⚠️ Please reply to an image.");
  const message = quoted.message;
  if (!message.imageMessage) return reply("⚠️ Please reply to an image.");
  const stream = await downloadContentFromMessage(message.imageMessage, 'image');
  let buffer = Buffer.from([]);
  for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
  return buffer;
}

// 1. Glass Effect
cmd({
  pattern: "glass",
  desc: "Apply glass effect on replied image",
  category: "image-creator",
  filename: __filename
}, async (conn, mek, m, { reply, quoted }) => {
  try {
    const buffer = await getBufferFromQuoted(quoted, reply);
    const form = new FormData();
    form.append("image", buffer, "image.jpg");

    // Replace with actual API endpoint
    const res = await axios.post("https://some-image-api.com/api/glass", form, { headers: form.getHeaders(), responseType: 'arraybuffer' });

    await conn.sendMessage(m.chat, { image: { buffer: res.data }, caption: "🔮 Glass Effect" }, { quoted: m });
  } catch (e) {
    console.error(e);
    reply("❌ Failed to create glass effect.");
  }
});

// 2. Sketch Effect
cmd({
  pattern: "sketch",
  desc: "Apply sketch effect on replied image",
  category: "image-creator",
  filename: __filename
}, async (conn, mek, m, { reply, quoted }) => {
  try {
    const buffer = await getBufferFromQuoted(quoted, reply);
    const form = new FormData();
    form.append("image", buffer, "image.jpg");

    const res = await axios.post("https://some-image-api.com/api/sketch", form, { headers: form.getHeaders(), responseType: 'arraybuffer' });

    await conn.sendMessage(m.chat, { image: { buffer: res.data }, caption: "✏️ Sketch Effect" }, { quoted: m });
  } catch (e) {
    console.error(e);
    reply("❌ Failed to create sketch effect.");
  }
});

// 3. Pixelate Effect
cmd({
  pattern: "pixelate",
  desc: "Pixelate replied image",
  category: "image-creator",
  filename: __filename
}, async (conn, mek, m, { reply, quoted }) => {
  try {
    const buffer = await getBufferFromQuoted(quoted, reply);
    const form = new FormData();
    form.append("image", buffer, "image.jpg");

    const res = await axios.post("https://some-image-api.com/api/pixelate", form, { headers: form.getHeaders(), responseType: 'arraybuffer' });

    await conn.sendMessage(m.chat, { image: { buffer: res.data }, caption: "🟦 Pixelate Effect" }, { quoted: m });
  } catch (e) {
    console.error(e);
    reply("❌ Failed to create pixelate effect.");
  }
});

// 4. Invert Colors
cmd({
  pattern: "invert",
  desc: "Invert colors of replied image",
  category: "image-creator",
  filename: __filename
}, async (conn, mek, m, { reply, quoted }) => {
  try {
    const buffer = await getBufferFromQuoted(quoted, reply);
    const form = new FormData();
    form.append("image", buffer, "image.jpg");

    const res = await axios.post("https://some-image-api.com/api/invert", form, { headers: form.getHeaders(), responseType: 'arraybuffer' });

    await conn.sendMessage(m.chat, { image: { buffer: res.data }, caption: "🎨 Inverted Colors" }, { quoted: m });
  } catch (e) {
    console.error(e);
    reply("❌ Failed to invert colors.");
  }
});

// 5. Cartoonize
cmd({
  pattern: "cartoon",
  desc: "Cartoonize replied image",
  category: "image-creator",
  filename: __filename
}, async (conn, mek, m, { reply, quoted }) => {
  try {
    const buffer = await getBufferFromQuoted(quoted, reply);
    const form = new FormData();
    form.append("image", buffer, "image.jpg");

    const res = await axios.post("https://some-image-api.com/api/cartoon", form, { headers: form.getHeaders(), responseType: 'arraybuffer' });

    await conn.sendMessage(m.chat, { image: { buffer: res.data }, caption: "🖌️ Cartoon Effect" }, { quoted: m });
  } catch (e) {
    console.error(e);
    reply("❌ Failed to cartoonize image.");
  }
});

// 6. Color Splash (Keep color, grayscale rest)
cmd({
  pattern: "colorsplash",
  desc: "Color splash effect",
  category: "image-creator",
  filename: __filename
}, async (conn, mek, m, { reply, quoted }) => {
  try {
    const buffer = await getBufferFromQuoted(quoted, reply);
    const form = new FormData();
    form.append("image", buffer, "image.jpg");

    const res = await axios.post("https://some-image-api.com/api/colorsplash", form, { headers: form.getHeaders(), responseType: 'arraybuffer' });

    await conn.sendMessage(m.chat, { image: { buffer: res.data }, caption: "🎨 Color Splash Effect" }, { quoted: m });
  } catch (e) {
    console.error(e);
    reply("❌ Failed to create color splash effect.");
  }
});

// 7. Blur Effect
cmd({
  pattern: "blur",
  desc: "Apply blur effect on replied image",
  category: "image-creator",
  filename: __filename
}, async (conn, mek, m, { reply, quoted }) => {
  try {
    const buffer = await getBufferFromQuoted(quoted, reply);
    const form = new FormData();
    form.append("image", buffer, "image.jpg");

    const res = await axios.post("https://some-image-api.com/api/blur", form, { headers: form.getHeaders(), responseType: 'arraybuffer' });

    await conn.sendMessage(m.chat, { image: { buffer: res.data }, caption: "💨 Blur Effect" }, { quoted: m });
  } catch (e) {
    console.error(e);
    reply("❌ Failed to create blur effect.");
  }
});

// 8. Oil Painting
cmd({
  pattern: "oilpaint",
  desc: "Oil paint effect",
  category: "image-creator",
  filename: __filename
}, async (conn, mek, m, { reply, quoted }) => {
  try {
    const buffer = await getBufferFromQuoted(quoted, reply);
    const form = new FormData();
    form.append("image", buffer, "image.jpg");

    const res = await axios.post("https://some-image-api.com/api/oilpaint", form, { headers: form.getHeaders(), responseType: 'arraybuffer' });

    await conn.sendMessage(m.chat, { image: { buffer: res.data }, caption: "🎨 Oil Painting Effect" }, { quoted: m });
  } catch (e) {
    console.error(e);
    reply("❌ Failed to create oil painting effect.");
  }
});

// 9. Sepia Effect
cmd({
  pattern: "sepia",
  desc: "Apply sepia effect on replied image",
  category: "image-creator",
  filename: __filename
}, async (conn, mek, m, { reply, quoted }) => {
  try {
    const buffer = await getBufferFromQuoted(quoted, reply);
    const form = new FormData();
    form.append("image", buffer, "image.jpg");

    const res = await axios.post("https://some-image-api.com/api/sepia", form, { headers: form.getHeaders(), responseType: 'arraybuffer' });

    await conn.sendMessage(m.chat, { image: { buffer: res.data }, caption: "🌅 Sepia Effect" }, { quoted: m });
  } catch (e) {
    console.error(e);
    reply("❌ Failed to create sepia effect.");
  }
});

// 10. Neon Glow Effect
cmd({
  pattern: "neon",
  desc: "Add neon glow effect to replied image",
  category: "image-creator",
  filename: __filename
}, async (conn, mek, m, { reply, quoted }) => {
  try {
    const buffer = await getBufferFromQuoted(quoted, reply);
    const form = new FormData();
    form.append("image", buffer, "image.jpg");

    const res = await axios.post("https://some-image-api.com/api/neon", form, { headers: form.getHeaders(), responseType: 'arraybuffer' });

    await conn.sendMessage(m.chat, { image: { buffer: res.data }, caption: "💡 Neon Glow Effect" }, { quoted: m });
  } catch (e) {
    console.error(e);
    reply("❌ Failed to create neon glow effect.");
  }
});
