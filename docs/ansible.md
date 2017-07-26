# Server configuration with ansible

## Prerequisites
- [Ansible](http://docs.ansible.com/ansible)

## Update ansible hosts
Ansible need to know the host where we want to launch the configuration so add
in the `ansible/hosts` file your hosts and the link to there ssh key like bellow:

    [webservers:vars]
    ansible_python_interpreter=/usr/bin/python3
    ansible_ssh_private_key_file=./key_react_express.pem <--- SSH KEY

    [webservers]
    52.59.242.52 <--- HOST

```bash
openssl passwd -salt 'salt' -1 'password'
```

## Launch server configuration
```bash
ansible-playbook -i hosts --ask-sudo-pass playbook.yml
```