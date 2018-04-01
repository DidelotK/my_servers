FROM nginx:1.13
MAINTAINER Kevin <work@didelotkev.ovh>

# Install Certbot (HTTPS)
RUN echo '#Debian Stretch, dépôt de rétroportages ("backports")\n\
deb http://ftp.debian.org/debian stretch-backports main' >> /etc/apt/sources.list
RUN apt-get update && apt-get install -y \
    python-certbot-nginx -t stretch-backports \
    && rm -rf /var/lib/apt/lists/*

# Add all necessary configurations
COPY conf/jenkins.conf /etc/nginx/conf.d/jenkins.conf
COPY conf/mycv.conf /etc/nginx/conf.d/mycv.conf
COPY conf/portainer.conf /etc/nginx/conf.d/portainer.conf
COPY conf/grafana.conf /etc/nginx/conf.d/grafana.conf
COPY conf/nginx.conf /etc/nginx/nginx.conf

# Expose HTTP and HTTPS ports
EXPOSE 80
EXPOSE 443

VOLUME /etc/letsencrypt
VOLUME /var/log/nginx

COPY ./scripts/run.sh /run.sh
RUN chmod +x /run.sh
CMD ["/run.sh"]
