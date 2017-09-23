# Docker

## Docker volumes location

	/var/lib/docker/volume/<volume>/_data
	
If you want to avoid typing sudo whenever you run the docker command, add your username to the docker group:
```sh
  $ sudo usermod -aG docker ${USER}
```
If you need to add a user to the docker group that you're not logged in as, declare that username explicitly using:
```sh
  $ sudo usermod -aG docker username
```

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
