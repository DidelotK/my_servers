#!/usr/bin/env bash

# Launch nginx (on background)
nginx

# Only ask for certificates if they did not exist
if [ -d "/etc/letsencrypt/live" ]; then
    certbot --nginx --non-interactive --agree-tos --redirect -m work@didelotkev.ovh -d cv.didelotkev.ovh -d jenkins.didelotkev.ovh -d portainer.didelotkev.ovh -d grafana.didelotkev.ovh
    #certbot certonly --standalone --agree-tos --non-interactive -m work@didelotkev.ovh -d test@didelotkev.ovh
fi

# Automating renewal HTTPS certificates
certbot renew --dry-run

nginx -s quit

nginx -g "daemon off;"
