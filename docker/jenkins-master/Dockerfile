FROM jenkins/jenkins:lts
MAINTAINER Kevin

# Needed to init jenkins admin user
COPY custom.groovy /usr/share/jenkins/ref/init.groovy.d/custom.groovy

# Create jenkins logs and home directories
USER root
RUN mkdir /var/log/jenkins
RUN mkdir /var/cache/jenkins
RUN chown -R jenkins:jenkins /var/log/jenkins
RUN chown -R jenkins:jenkins /var/cache/jenkins

# Install ansible
RUN echo "deb http://ppa.launchpad.net/ansible/ansible/ubuntu trusty main" >> /etc/apt/sources.list
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 93C4A3FD7BB9C367
RUN apt-get update && apt-get install -y ansible && rm -rf /var/lib/apt/lists/*

# Copy in the Docker certs, we'll use /usr/local/etc for them
#COPY certs/ca.pem /usr/local/etc/jenkins/certs/docker/ca.pem
#COPY certs/cert.pem /usr/local/etc/jenkins/certs/docker/cert.pem
#COPY certs/key.pem /usr/local/etc/jenkins/certs/docker/key.pem
# Make sure cert permissions are set correctly
#RUN chmod +r /usr/local/etc/jenkins/certs/docker/ca.pem
#RUN chmod +r /usr/local/etc/jenkins/certs/docker/cert.pem
#RUN chown -R jenkins:jenkins /usr/local/etc/jenkins

USER jenkins

# Set list of plugin to download on init
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt

# Set environment variable
ENV JAVA_OPTS="-Xmx8192m -Djenkins.install.runSetupWizard=true"
ENV JENKINS_OPTS="--handlerCountMax=300 --logfile=/var/log/jenkins/jenkins.log --webroot=/var/cache/jenkins/war"