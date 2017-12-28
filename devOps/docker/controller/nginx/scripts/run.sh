#!/usr/bin/env bash

# Launch nginx (on background)
nginx

# Configure HTTPS with Certbox
certbot --nginx --non-interactive --agree-tos --redirect -m work@didelotkev.ovh -d cv.didelotkev.ovh -d jenkins.didelotkev.ovh -d portainer.didelotkev.ovh -d grafana.didelotkev.ovh

# Automating renewal HTTPS certificates
certbot renew --dry-run

nginx -s quit

nginx -g "daemon off;"
