# Continuous integration of React/Express App with jenkins/docker/ansible

## Servers configurations

### Environment: All

#### SSH Key

In order to connect via ssh in the futurs servers, create a ssh key with the following command.

```bash
ssh-keygen -t rsa -b 4096
```

<b>Note:</b> In stage environment you have to:
    Set ssh key name to `superuser_id_rsa`
    Put the key in `~/.ssh/`
    
Or you can change the configs in the `Vagrantfile` (`devOps/Vagrantfile`)

#### Encrypt password

During the server initialization ansible create a new user with a new password.
This password need to be encrypted with `openssl`.
Here is the command to encrypt your password correctly (replace `salt` and `password` with your values): 
```bash
openssl passwd -salt 'salt' -1 'password'
```
Take the result of this command and replace the following value `admin_user_password` in `devOps/ansible/group_vars/all.yml`

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

    192.168.1.51    jenkins.didelotkev.ovh
    192.168.1.50    webapp.didelotkev.ovh

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
[Configuration with ansible](https://github.com/DidelotK/react-express-devops/blob/ansible/docs/ansible.md)
TODO update configuration

### More Informations about the configurations

All the servers use docker for virtualization, this makes possible to subsequently migrate more easily to other solutions.

Follow this [link](https://github.com/DidelotK/react-express-devops/blob/ansible/docs/setup_jenkins.md) for more information about deployed containers

## Setup jenkins

[Setup jenkins](https://github.com/DidelotK/react-express-devops/blob/ansible/docs/setup_jenkins.md)

