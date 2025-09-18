FROM node:20

WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# Expose port (you may need to change if your .env uses a different port)
EXPOSE 3000
CMD ["node", "server.js"]