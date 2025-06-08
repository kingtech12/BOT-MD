FROM node:lts-buster
RUN git clone https://github.com/K1NG-TECH/BOT-MD/root/K1NG-TECH
WORKDIR /root/K1NG TECH
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]
