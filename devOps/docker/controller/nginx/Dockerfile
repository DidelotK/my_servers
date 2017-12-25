FROM debian:stretch
MAINTAINER Kevin <work@didelotkev.ovh>

# Create nginx user
RUN useradd -u 1000 -s /bin/bash nginx

# Install nginx
RUN apt-get update
RUN apt-get install nginx -y

# Remove useless configurations
#RUN rm /etc/nginx/conf.d/default.conf
#RUN rm /etc/nginx/conf.d/example_ssl.conf

# Add all necessary configurations
COPY conf/jenkins.conf /etc/nginx/conf.d/jenkins.conf
COPY conf/mycv.conf /etc/nginx/conf.d/mycv.conf
COPY conf/nginx.conf /etc/nginx/nginx.conf

# Install Certbot (HTTPS)
RUN echo '#Debian Stretch, dépôt de rétroportages ("backports")\n\
deb http://ftp.debian.org/debian stretch-backports main' >> /etc/apt/sources.list
RUN cat /etc/apt/sources.list
RUN apt-get update
RUN apt-get install python-certbot-nginx -t stretch-backports -y

# Expose HTTP and HTTPS ports
EXPOSE 80
EXPOSE 443

COPY ./scripts/run.sh /run.sh
RUN chmod +x /run.sh
CMD ["/run.sh"]
