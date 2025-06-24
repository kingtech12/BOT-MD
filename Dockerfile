FROM node:lts-buster
RUN git clone https://github.com/kingtech12/K1NG-MD/root/kingtech12
WORKDIR /root/kingtech12
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]