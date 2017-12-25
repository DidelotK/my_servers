#!/usr/bin/env bash

# Configure HTTPS with Certbox
certbot --nginx --non-interactive --agree-tos --redirect -m didelotkev@gmail.com -d cv.didelotkev.ovh -d jenkins.didelotkev.ovh

# Automating renewal HTTPS certificates
certbot renew --dry-run
