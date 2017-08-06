FROM node:6.11

# set maintainer
MAINTAINER "didelotkev@gmail.com"


# set a health check
#HEALTHCHECK --interval=5s \
#            --timeout=5s \
#            CMD curl -f http://127.0.0.1:4000 || #exit 1

# tell docker what port to expose
EXPOSE 4000
