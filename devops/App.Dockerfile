FROM nginx:alpine
# envconsul installation
WORKDIR /app
COPY devops/nginx.conf  /etc/nginx/conf.d/default.conf
COPY app/dist/ /app
