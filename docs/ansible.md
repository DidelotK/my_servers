# Server configuration with ansible

## Prerequisites
- [Ansible](http://docs.ansible.com/ansible)

## Update ansible hosts
Ansible need to know the host to launch the configuration so add
in the `ansible/inventory` file your hosts and the link to there ssh key like bellow:

    webserver ansible_host=35.159.19.245
    controller ansible_host=35.159.19.246
    
    [ec2]
    webserver
    
    [ec2:vars]
    ansible_ssh_private_key_file=./key_webservers.pem
    
    [all]
    webserver

## Install ansible role requirements
```bash
ansible-galaxy install -p ./roles -r requirements.yml
```

## Launch servers configuration (controller + webserver)
```bash
ansible-playbook controllers.configuration.yml --ask-sudo-pass -i ./inventories/production --vault-password-file .vault_password -e admin_user=admin
```
