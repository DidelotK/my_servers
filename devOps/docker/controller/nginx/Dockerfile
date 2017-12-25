FROM debian:jessie
MAINTAINER Kevin

# Create nginx user
RUN useradd -u 1000 -s /bin/bash nginx

# Install nginx
RUN apt-get update -y
RUN apt-get install nginx/8 -y

# Remove useless configurations
#RUN rm /etc/nginx/conf.d/default.conf
#RUN rm /etc/nginx/conf.d/example_ssl.conf

# Add all necessary configurations
COPY conf/jenkins.conf /etc/nginx/conf.d/jenkins.conf
COPY conf/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx"]
