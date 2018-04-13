#!/usr/bin/env bash

# Launch nginx (on background)
#nginx

# Only ask for certificates if they did not exist
#if [ ! -d "/etc/letsencrypt/live" ]; then
#    echo "CERTBOT: GET CERTFICATES"
#    certbot --nginx --non-interactive --agree-tos --redirect -m work@didelotkev.ovh -d cv.didelotkev.ovh -d jenkins.didelotkev.ovh -d portainer.didelotkev.ovh -d grafana.didelotkev.ovh
#fi

# Automating renewal HTTPS certificates
#certbot renew
#
#nginx -s quit

echo "NGING: START"
nginx -g "daemon off;"
