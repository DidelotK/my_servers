# Server configuration with ansible

## Prerequisites
- [Ansible](http://docs.ansible.com/ansible)

## Update ansible hosts
Ansible need to know the host to launch the configuration so add
in the `ansible/inventory` file your hosts and the link to there ssh key like bellow:

    manager1 ansible_host=35.159.19.246
    
    [all]
    manager1

## Install ansible role requirements
```bash
ansible-galaxy install -p ./roles -r requirements.yml
```

## Launch servers configuration (manager + webserver)
```bash
ansible-playbook docker.nodes.configuration.yml --ask-sudo-pass -i ./inventories/production --vault-password-file .vault_password -e admin_user=admin
```
