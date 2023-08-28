ARG NODE_VERSION=18.10.0

FROM node:${NODE_VERSION} as builder

ARG TARGETPLATFORM

WORKDIR /app
RUN npm i -g pnpm@7.26.1
ENV NODE_ENV=development
COPY . /app

RUN \
    if [ "$TARGETPLATFORM" = 'linux/arm64' ]; then \
    apk --no-cache add \
    python3 \
    build-base \
    && ln -sf /usr/bin/python3 /usr/bin/python \
    ; fi
RUN pnpm install
RUN npm run build


# Directus image
FROM node:${NODE_VERSION}

ARG VERSION
ARG REPOSITORY=directus/directus

LABEL directus.version="${VERSION}"

# Default environment variables
# (see https://docs.directus.io/reference/environment-variables/)
ENV \
    EXTENSIONS_PATH="/app/extensions" \
    STORAGE_LOCAL_ROOT="/app/uploads"



# Switch to user 'node' and directory '/directus'
USER node
WORKDIR /app

# disable npm update warnings
RUN echo "update-notifier=false" >> ~/.npmrc

COPY --from=builder --chown=node:node /app .

ENV NODE_ENV=production

RUN chown node:node /app/uploads
RUN chown node:node /app/extensions
RUN touch /app/database/data.db
RUN npm run schema:apply 

EXPOSE 8055
CMD npm start