ARG GRAFANA_VERSION="latest"

FROM grafana/grafana:${GRAFANA_VERSION}


COPY ./entrypoint.sh /entrypoint.sh
RUN chmod 755 /entrypoint.sh

WORKDIR /
ENTRYPOINT [ "/entrypoint.sh" ]
