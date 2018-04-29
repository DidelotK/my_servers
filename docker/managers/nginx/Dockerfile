FROM nginx:1.13
MAINTAINER Kevin <work@didelotkev.ovh>

# Install Certbot (HTTPS)
#RUN echo '#Debian Stretch, dépôt de rétroportages ("backports")\n\
#deb http://ftp.debian.org/debian stretch-backports main' >> /etc/apt/sources.list
#RUN apt-get update && apt-get install -y \
#    python-certbot-nginx -t stretch-backports \
#    && rm -rf /var/lib/apt/lists/*

# Expose HTTP and HTTPS ports
EXPOSE 80
EXPOSE 443

VOLUME /etc/letsencrypt
VOLUME /var/log/nginx

COPY ./scripts/run.sh /run.sh
RUN chmod +x /run.sh
CMD ["/run.sh"]
