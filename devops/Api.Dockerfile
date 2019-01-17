FROM node:8.14.0-alpine
RUN apk update && apk upgrade && apk add zip unzip
RUN wget https://releases.hashicorp.com/envconsul/0.7.3/envconsul_0.7.3_linux_amd64.zip && unzip envconsul_0.7.3_linux_amd64.zip\
&& ln -sf $PWD/envconsul /usr/local/bin

WORKDIR /app

COPY api/dist/ /app/dist/
COPY api/public/ /app/public/
COPY api/.babelrc /app/.babelrc
COPY api/.env.example /app/.env
COPY api/node_modules/ /app/node_modules/

ADD devops/config.hcl config.hcl
ENTRYPOINT ["envconsul","-config", "./config.hcl"]
CMD [ "node", "dist" ]
