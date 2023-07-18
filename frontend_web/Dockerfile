FROM node:alpine AS production

# Set environment variables
ENV ANALYZE=false
ENV NEXT_PUBLIC_API_SERVER_URL=https://flashlyf.com/
ENV NEXT_PUBLIC_BASE_URL=https://flashlyf.com/
ENV NEXT_PUBLIC_NODE_ENV=production
ENV NEXT_TELEMETRY_DEBUG=1
ENV NEXT_TELEMETRY_DISABLED=1
ENV SESSION_SECRET=abdc
ENV HTTPS=true

COPY . /frontend_web
WORKDIR /frontend_web
RUN npm install
RUN npx next telemetry disable
RUN npm run build
CMD ["npm", "run", "start"]

FROM node:alpine AS development

COPY . /frontend_web
WORKDIR /frontend_web
RUN npm install
RUN npx next telemetry disable
CMD ["npm", "run", "dev"]

