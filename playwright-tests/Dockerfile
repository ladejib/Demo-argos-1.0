FROM mcr.microsoft.com/playwright:v1.52.0-noble

WORKDIR /app

COPY . .
RUN npm ci
RUN npm install dotenv

ENTRYPOINT ["/bin/bash", "entrypoint.sh"]
