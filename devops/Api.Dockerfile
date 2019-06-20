FROM node:8.14.0-alpine
RUN apk update && apk upgrade && apk add zip unzip


RUN apk add --no-cache python3 && \
    if [ ! -e /usr/bin/python ]; then ln -sf python3 /usr/bin/python ; fi && \
    \
    echo "**** install pip ****" && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --no-cache --upgrade pip setuptools wheel && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi

RUN pip install envault

WORKDIR /app

COPY api/dist/ /app/dist/
COPY api/public/ /app/public/
COPY api/.babelrc /app/.babelrc
COPY api/.env.example /app/.env
COPY api/node_modules/ /app/node_modules/

ENTRYPOINT [ "envault", "run" ]
CMD ["node dist"]
