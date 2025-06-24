# K1NG-XMD-V1


<p align="center">
  <a href="https://readme-typing-svg.demolab.com/">
    <img src="https://readme-typing-svg.demolab.com?font=Black+Ops+One&size=80&pause=1000&color=459BF7FF&center=true&vCenter=true&width=1000&height=200&lines=K1NG-XMD-V1;VERSION+2025;BY+DEV+K1NG+TECH" 
         alt="K1NG-XMD Banner by DEV K1NG TECH" />
  </a>
</p>

<h1 align="center">THE NEXT GEN WHATSAPP BOT <br>BY DEV K1NG TECH</h1>

---

<p align="center">
  <img src="https://files.catbox.moe/6fdcy3.jpg" width="700"/>
</p>

---

<p align="center">
  <a href="https://github.com/K1NGXMD">
    <img title="Author" src="https://img.shields.io/badge/Author-DEV%20K1NGTECH-ff004d?style=for-the-badge&logo=github&logoColor=white" />
  </a>
  <a href="https://whatsapp.com/channel/0029VbB1ik6JJhzOJmJQI33d">
    <img title="Join WhatsApp Channel" src="https://img.shields.io/badge/Join-WhatsApp%20Channel-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" />
  </a>
</p>

<p align="center">
  <img src="https://profile-counter.glitch.me/K1NG-XMD-V1/count.svg" alt="Visitor Count" />
</p>

---

## 👻 Features

- ♻️ QR Code Generator for WhatsApp Pairing  
- ♻️ Session Sharing System  
- ♻️ Fully Open Source  
- ♻️ Auto QR to DM  
- ♻️ Session ID Generator (`K1NG-XMD-SESSION-ID`)  
- ♻️ Multi Deploy Options (Render, Heroku, Koyeb, etc.)

---

## ⚙️ Deploy Easily

### 🔑 Get Your Session ID 1️⃣
[![K1NG-XMD SESSION](https://img.shields.io/badge/K1NG%20-XMD%20SESSION-25D366?style=for-the-badge&logo=whatsapp&logoColor=red)](https://king-tech-k1ng-xmd-session-id.onrender.com/pair)

### 🔑 Get Your Session ID 2️⃣
[![K1NG-XMD SESSION](https://img.shields.io/badge/K1NG%20-XMD%20SESSION-25D366?style=for-the-badge&logo=whatsapp&logoColor=blue)](https://k1ng-xmd-session-id1.onrender.com)

---

### 🚀 Fork This Repo

<p align="center">
  <a href="https://github.com/kingtech12/K1NG-XMD/fork">
    <img src="https://img.shields.io/badge/Fork%20This-Repository-8A2BE2?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</p>

---

### ☁️ Deploy To Platforms

<p align="center">
  <a href="https://github.com/K1NGXMD/K1NG-XMD-V1">
    <img src="https://img.shields.io/badge/Deploy%20To%20Replit-FFA500?style=for-the-badge&logo=replit&logoColor=white" />
  </a>
  <a href="https://railway.app/new/template?template=https://github.com/K1NGXMD/K1NG-XMD-V1">
    <img src="https://img.shields.io/badge/Deploy%20To%20Railway-8B5CF6?style=for-the-badge&logo=railway&logoColor=white" />
  </a>
  <a href="https://render.com/">
    <img src="https://img.shields.io/badge/Deploy%20To%20Render-06B6D4?style=for-the-badge&logo=render&logoColor=white" />
  </a>
</p>

<p align="center">
  <a href="https://dashboard.heroku.com/new?template=https://github.com/K1NGXMD/K1NG-XMD-V1/tree/main">
    <img src="https://img.shields.io/badge/Deploy-Heroku-FF004D?style=for-the-badge&logo=heroku&logoColor=white" />
  </a>
  <a href="https://host.talkdrove.com/share-bot/82">
    <img src="https://img.shields.io/badge/Deploy-TaikDrove-6971FF?style=for-the-badge&logo=google-cloud&logoColor=white" />
  </a>
  <a href="https://app.koyeb.com/services/deploy?type=git&repository=K1NGXMD/K1NG-XMD-V1&ports=3000">
    <img src="https://img.shields.io/badge/Deploy-Koyeb-FF009D?style=for-the-badge&logo=koyeb&logoColor=white" />
  </a>
</p>

---

### 📦 Download the Bot File

<p align="center">
  <a href="https://github.com/kingtech12/K1NG-XMD/archive/refs/heads/main.zip">
    <img src="https://img.shields.io/badge/Download%20Bot-file-FF009D?style=for-the-badge&logo=github&logoColor=white" alt="Download Bot File" />
  </a>
</p>

Credits & Contributors

> <a href="https://github.com/K1NGXMD">
  <img alt="K1NG XMD- OWNER" src="https://img.shields.io/badge/OWNER-DEV%20K1NG-FF0000?style=for-the-badge&logo=github" />
</a>  

 

---

### ⚙️ Configuration `.env` File

```env
SESSION_ID="K1NG~XMD~"
AUTO_READ_STATUS=true
STATUS_READ_MSG="*Status Seen By K1NG-MD-V1 ♻️*"
AUTO_STATUS_REPLY=false
AUTO_REJECT_CALLS=false
MODE="public"
WELCOME=false
AUTO_READ_MESSAGES=false
AUTO_TYPING=false
OWNER_NAME="K1NG-XMD-V1"
OWNER_NUMBER="50933734591"
AUTO_RECORDING=false
ALWAYS_ONLINE=false
AUTO_BLOCK=true
AUTO_REACT=false
PREFIX="."
```

---

### ⚙️ Configuration `nodes.js` File

```
name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  schedule:
    - cron: '0 */6 * * *'  

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Install FFmpeg
      run: sudo apt-get install -y ffmpeg

    - name: Start application with timeout
      run: |
        timeout 21590s npm start  # Limite l'exécution à 5h 59m 50s

    - name: Save state (Optional)
      run: |
        ./save_state.sh
```
