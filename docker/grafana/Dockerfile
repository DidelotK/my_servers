ARG GRAFANA_VERSION="latest"

FROM grafana/grafana:${GRAFANA_VERSION}

USER root

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod 755 /entrypoint.sh

USER grafana

WORKDIR /
ENTRYPOINT [ "/entrypoint.sh" ]
