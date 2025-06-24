const { cmd } = require('../command');
const axios = require('axios');

// 1. Wanted poster effect
cmd({
  pattern: "wanted",
  desc: "Generate a Wanted poster from a replied photo",
  category: "gamer-effects",
  filename: __filename
}, async (conn, mek, m, { reply, quoted }) => {
  try {
    const image = quoted && quoted.message && (quoted.message.imageMessage || quoted.message.videoMessage);
    if (!image) return reply("⚠️ Please reply to an image or video to create a Wanted poster.");
    
    const stream = await downloadContentFromMessage(image, 'image');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    
    const form = new FormData();
    form.append("image", buffer, "image.jpg");
    
    // Example API for Wanted poster effect (replace with real if available)
    const res = await axios.post('https://some-image-api.com/api/wanted', form, { headers: form.getHeaders(), responseType: 'arraybuffer' });
    
    await conn.sendMessage(m.chat, { image: { buffer: res.data }, caption: "🔫 Wanted Poster" }, { quoted: m });
  } catch (e) {
    console.log(e);
    reply("❌ Failed to generate Wanted poster.");
  }
});

// 2. Wasted effect (GTA style)
cmd({
  pattern: "wasted",
  desc: "Generate Wasted effect on replied image",
  category: "gamer-effects",
  filename: __filename
}, async (conn, mek, m, { reply, quoted }) => {
  try {
    const image = quoted && quoted.message && (quoted.message.imageMessage || quoted.message.videoMessage);
    if (!image) return reply("⚠️ Reply to an image to create Wasted effect.");
    
    const stream = await downloadContentFromMessage(image, 'image');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    
    const form = new FormData();
    form.append("image", buffer, "image.jpg");
    
    // Replace with your real API endpoint for Wasted effect
    const res = await axios.post('https://some-image-api.com/api/wasted', form, { headers: form.getHeaders(), responseType: 'arraybuffer' });
    
    await conn.sendMessage(m.chat, { image: { buffer: res.data }, caption: "💀 Wasted Effect" }, { quoted: m });
  } catch (e) {
    console.log(e);
    reply("❌ Failed to generate Wasted effect.");
  }
});

// 3. Triggered effect (animated GIF)
cmd({
  pattern: "triggered",
  desc: "Generate Triggered GIF from replied image",
  category: "gamer-effects",
  filename: __filename
}, async (conn, mek, m, { reply, quoted }) => {
  try {
    const image = quoted && quoted.message && (quoted.message.imageMessage || quoted.message.videoMessage);
    if (!image) return reply("⚠️ Reply to an image to create Triggered effect.");
    
    const stream = await downloadContentFromMessage(image, 'image');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    
    const form = new FormData();
    form.append("image", buffer, "image.jpg");
    
    // Example API URL, replace with your working endpoint
    const res = await axios.post('https://some-image-api.com/api/triggered', form, { headers: form.getHeaders(), responseType: 'arraybuffer' });
    
    await conn.sendMessage(m.chat, { video: { buffer: res.data, gifPlayback: true }, caption: "⚠️ Triggered Effect" }, { quoted: m });
  } catch (e) {
    console.log(e);
    reply("❌ Failed to generate Triggered effect.");
  }
});

// 4. Burn effect
cmd({
  pattern: "burn",
  desc: "Apply burning effect on replied image",
  category: "gamer-effects",
  filename: __filename
}, async (conn, mek, m, { reply, quoted }) => {
  try {
    const image = quoted && quoted.message && (quoted.message.imageMessage || quoted.message.videoMessage);
    if (!image) return reply("⚠️ Reply to an image to create Burn effect.");
    
    const stream = await downloadContentFromMessage(image, 'image');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    
    const form = new FormData();
    form.append("image", buffer, "image.jpg");
    
    const res = await axios.post('https://some-image-api.com/api/burn', form, { headers: form.getHeaders(), responseType: 'arraybuffer' });
    
    await conn.sendMessage(m.chat, { image: { buffer: res.data }, caption: "🔥 Burn Effect" }, { quoted: m });
  } catch (e) {
    console.log(e);
    reply("❌ Failed to generate Burn effect.");
  }
});

// 5. Jail effect (prison bars overlay)
cmd({
  pattern: "jail",
  desc: "Apply Jail bars effect on replied image",
  category: "gamer-effects",
  filename: __filename
}, async (conn, mek, m, { reply, quoted }) => {
  try {
    const image = quoted && quoted.message && (quoted.message.imageMessage || quoted.message.videoMessage);
    if (!image) return reply("⚠️ Reply to an image to create Jail effect.");
    
    const stream = await downloadContentFromMessage(image, 'image');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    
    const form = new FormData();
    form.append("image", buffer, "image.jpg");
    
    const res = await axios.post('https://some-image-api.com/api/jail', form, { headers: form.getHeaders(), responseType: 'arraybuffer' });
    
    await conn.sendMessage(m.chat, { image: { buffer: res.data }, caption: "🚔 Jail Bars Effect" }, { quoted: m });
  } catch (e) {
    console.log(e);
    reply("❌ Failed to generate Jail effect.");
  }
});

// 6. Hitler mustache effect (funny)
cmd({
  pattern: "hitler",
  desc: "Add Hitler mustache on replied image",
  category: "gamer-effects",
  filename: __filename
}, async (conn, mek, m, { reply, quoted }) => {
  try {
    const image = quoted && quoted.message && (quoted.message.imageMessage || quoted.message.videoMessage);
    if (!image) return reply("⚠️ Reply to an image to add Hitler mustache.");
    
    const stream = await downloadContentFromMessage(image, 'image');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    
    const form = new FormData();
    form.append("image", buffer, "image.jpg");
    
    const res = await axios.post('https://some-image-api.com/api/hitler', form, { headers: form.getHeaders(), responseType: 'arraybuffer' });
    
    await conn.sendMessage(m.chat, { image: { buffer: res.data }, caption: "🎩 Hitler Mustache Effect" }, { quoted: m });
  } catch (e) {
    console.log(e);
    reply("❌ Failed to add Hitler mustache effect.");
  }
});
