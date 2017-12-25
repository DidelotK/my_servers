# Continuous integration of React/Express App with jenkins/docker/ansible

## Servers configurations

### Environment: All

#### SSH Keys

In order to make the application run correctly we have to create the following keys:

##### SSH key to connect in servers (webapp, controllers)

```bash
cd devOps/ssh-keys
ssh-keygen -t rsa -b 4096
# Expected result:
    devOps/ssh-keys/admin_id_rsa
    devOps/ssh-keys/admin_id_rsa.pub
```
    
##### SSH key to make controllers deploy in webapp with ansible

```bash
cd devOps/ssh-keys
ssh-keygen -t rsa -b 4096
# Expected result:
    devOps/ssh-keys/webapp_id_rsa
    devOps/ssh-keys/webapp_id_rsa.pub
```
    
##### SSH key to make jenkins master build in jenkins slave 

```bash
cd devOps/docker/jenkins-node-slave/ssh-keys
ssh-keygen -t rsa -b 4096
mv id_rsa.pub authorized_keys
# Expected result:
    devOps/docker/jenkins-node-slave/ssh-keys/id_rsa
    devOps/docker/jenkins-node-slave/ssh-keys/authorized_keys
```
   
#### Admin user password

During the server initialization ansible will create a new user automatically. But to do so we need to provide it a password. Ansible needs the password to be encrypted with `openssl` .

Here is the command to encrypt your password correctly (replace `salt` and `password` with your values): 

```bash
openssl passwd -salt 'salt' -1 'password'
```

Replace `admin_user_password` in `devOps/ansible/group_vars/all.yml` by the result of the above command.

#### Vault variables

This project use ansible vault in order to encrypt sensible data.

So first create a `.vault_password` file in the `devOps/ansible` directory. This file will be used to encrypt/decrypt all the ansibled vaulted variables

The file should only contain one password

<b>.vault_password example:</b>
    
    yourpassword

Here is the list of variables to encrypt in the project

    dds_passphrase:
        Location: devOps/ansible/group-vars/controller.yml
        Aim: The passphrase used to create docker TLS certificates

### Environment: Stage

#### Prerequisites
- [virtualbox](https://www.virtualbox.org/)
- [vagrant](https://www.vagrantup.com/)
- [ansible](https://www.ansible.com/)

#### Local configurations

##### DNS
Add those lines in our `/etc/hosts` in order to see the result on your web browser
(if you want to change the DNS you can change it in the following files `docker/controller/nginx/conf/*.conf`)

    192.168.50.51    jenkins.didelotkev.ovh
    192.168.50.50    webapp.didelotkev.ovh

#### Run and configure servers

Run this command to create the machines vms and launch provisioning.
```bash
cd devOps
vagrant up --provision
```

Once finished, open `jenkins.didelotkev.ovh` in your browser you should see jenkins running.

<b>Default credentials:</b> 
      
    user: admin
    password: admin

### Environment: Production

#### Prerequisites
- [ansible](https://www.ansible.com/)

#### Configure servers

##### Update ansible inventory
Ansible need to know the hosts to launch the configuration so add
in the `ansible/inventory` file your hosts and the link to there ssh key like bellow:

    webserver ansible_host=35.159.19.245 # your webserver ip (webapp)
    controller ansible_host=35.159.19.246 # your controller ip (jenkins, grafana ...)
    
    [controllers]
    controller

    [ec2]
    webserver
    controller
    
    [ec2:vars]
    ansible_ssh_private_key_file=./servers.pem
    
    [all]
    webserver
    controller

## Install ansible role requirements
```bash
cd devOps/ansible
ansible-galaxy install -p ./roles -r requirements.yml
```

## Launch servers initialization (controller + webserver)

This playbook will setup the admin and add the ssh key to make controllers deploy in webapp created before

```bash
cd devOps/ansible
ansible-playbook -i inventory --ask-sudo-pass --ask-vault-pass site.init.yml
```

## Launch servers configuration (controller + webserver)

This playbook will configure the following in the controller:
        
    - Install pip
    - Install docker
    - Configure docker daemon (tls)
    - Install docker compose
    - Launch the main docker compose (nginx, jenkins, jenkins data, jenkins slave)

This playbook will configure the following in the webapp:
        
    - Install pip
    - Install docker
    - Install docker compose
    - Launch the main docker compose (nginx, jenkins, jenkins data, jenkins slave)

```bash
cd devOps/ansible
ansible-playbook -i inventory --ask-sudo-pass --ask-vault-pass site.configuration.yml
```

### More Informations about the configurations

All the servers use docker for virtualization, this makes possible to subsequently migrate more easily to other solutions.

Follow this [link](https://github.com/DidelotK/react-express-devops/blob/dev/docs/setup_jenkins.md) for more information about deployed containers

## Setup jenkins

[Setup jenkins](https://github.com/DidelotK/react-express-devops/blob/dev/docs/setup_jenkins.md)
