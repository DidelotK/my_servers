#!/usr/bin/env bash

# Restart nginx
service nginx restart

# Configure HTTPS with Certbox
certbot --nginx

# Automating renewal HTTPS certificates
certbot renew --dry-run
