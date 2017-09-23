FROM debian:jessie
MAINTAINER Kevin

# Install packages
RUN apt-get update -y
RUN apt-get install -y git \
					   wget \
					   openssh-server \
					   sudo

# Clean package
RUN apt-get autoremove
RUN apt-get autoclean

# Set SSH Configuration to allow remote logins without /proc write access
RUN sed -ri 's/^session\s+required\s+pam_loginuid.so$/session optional pam_loginuid.so/' /etc/pam.d/sshd

# Create Jenkins User
RUN useradd jenkins -u 1000 -m -s /bin/bash

# Add public key for Jenkins login
RUN mkdir /home/jenkins/.ssh
COPY /files/authorized_keys /home/jenkins/.ssh/authorized_keys
RUN chown -R jenkins /home/jenkins
RUN chgrp -R jenkins /home/jenkins
RUN chmod 600 /home/jenkins/.ssh/authorized_keys
RUN chmod 700 /home/jenkins/.ssh

# Add the jenkins user to sudoers
RUN echo "jenkins  ALL=(ALL)  ALL" >> etc/sudoers

# Set Name Servers
COPY /files/resolv.conf /etc/resolv.conf

# Expose SSH port and run SSHD
EXPOSE 22
CMD ["/usr/sbin/sshd","-D"]
