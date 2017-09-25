FROM jenkinsci/ssh-slave
MAINTAINER Kevin

# Install node 8
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -y nodejs

# Set Name Servers (without this npm install fails)
COPY resolv.conf /etc/resolv.conf