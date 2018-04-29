FROM jenkinsci/ssh-slave
MAINTAINER Kevin

# Install node 8
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -y nodejs

# Install docker CLI
RUN curl -fsSLO https://get.docker.com/builds/Linux/x86_64/docker-17.04.0-ce.tgz \
	&& tar xzvf docker-17.04.0-ce.tgz \
	&& mv docker/docker /usr/local/bin \
	&& rm -r docker docker-17.04.0-ce.tgz

# Copy in the Docker certs, we'll use /usr/local/etc for them
#COPY certs/ca.pem /usr/local/etc/jenkins/certs/docker/ca.pem
#COPY certs/cert.pem /usr/local/etc/jenkins/certs/docker/cert.pem
#COPY certs/key.pem /usr/local/etc/jenkins/certs/docker/key.pem

# Make sure cert permissions are set correctly
#RUN chmod +r /usr/local/etc/jenkins/certs/docker/ca.pem
#RUN chmod +r /usr/local/etc/jenkins/certs/docker/cert.pem
#RUN chown -R jenkins:jenkins /usr/local/etc/jenkins
