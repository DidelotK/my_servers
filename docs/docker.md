# Docker informations

## Available docker images

### Jenkins master

This is the container where run jenkins

<b>Note:</b> You need to generate all the certificate before building otherwise the build will crash.
Those certificates should be in the jenkins-master `certs` directory

### Jenkins data

This is a data volumes container, this container store the `jenkins_home` and the `jenkins.log`

### Jenkins node slave

This container will serve jenkins to build all the node projet 

### Nginx

This container run the nginx server
