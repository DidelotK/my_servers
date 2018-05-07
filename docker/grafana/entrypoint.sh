#!/usr/bin/env bash

# Docker secrets support
if [ -f /run/secrets/GRAFANA_USER ]; then
  export GF_SECURITY_ADMIN_USER=$(< /run/secrets/GRAFANA_USER)
fi

if [ -f /run/secrets/GRAFANA_PASSWORD ]; then
  export GF_SECURITY_ADMIN_PASSWORD=$(< /run/secrets/GRAFANA_PASSWORD)
fi

/run.sh
