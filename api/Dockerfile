FROM node:8-alpine

# Port Application listens on
EXPOSE 8848

# Copy app and install packages
WORKDIR /app
COPY . /app/

# Default app commands
ENTRYPOINT ["npm"]
CMD ["run", "start:dev"]
