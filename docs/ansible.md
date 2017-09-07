# Server configuration with ansible

## Prerequisites
- [Ansible](http://docs.ansible.com/ansible)

## Update ansible hosts
Ansible need to know the host to launch the configuration so add
in the `ansible/hosts` file your hosts and the link to there ssh key like bellow:

	webserver ansible_host=35.159.19.246

	[ec2]
	webserver

	[ec2:vars]
	ansible_python_interpreter=/usr/bin/python3
	ansible_ssh_private_key_file=./key_webservers.pem

	[all]
	webserver


```bash
openssl passwd -salt 'salt' -1 'password'
```

## Install ansible role requirements
```bash
ansible-galaxy install -p ./roles -r requirements.yml
```

## Launch server configuration
```bash
ansible-playbook -i hosts --ask-sudo-pass playbook.yml
```
