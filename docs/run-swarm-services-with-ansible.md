## Pre-configure servers with Ansible

The following playbook will setup the admin and add the ssh key to make managers deploy in webapp created before

In order to use it, make sure that:
- `admin_user` var is in inventory for `all`
- `path_to_ssh_admin_public_keys` var is in inventory for `all`
- The ssh key associated to the previous path is created
- The `.vault_password` file exist containing the vault password used to encode your var (if don't exist remove `--vault-password-file .vault_password` to the command bellow)

```bash
cd ansible
ansible-playbook -i inventories/production/init.hosts --ask-sudo-pass --vault-password-file .vault_password playbooks/servers_preconfiguration.yml
```

## Install docker on servers

This playbook will configure the following in the manager:
        
    - Install pip
    - Install docker
    - Configure docker daemon (tls)
    - Install docker compose

In order to use it, make sure that:
- `admin_user` var is in inventory for `all`
- The `.vault_password` file exist containing the vault password used to encode your var (if don't exist remove `--vault-password-file .vault_password` to the command bellow)

```bash
cd ansible
ansible-playbook --ask-sudo-pass --vault-password-file .vault_password playbooks/docker_installation.yml
```

## Configure swarm cluster

The following playbook with create configure the swarm cluster.

In order to use it, make sure that:
- `admin_user` var is in inventory for `all`
- `managers` group is in inventory
- `workers` group is in inventory
- `swarm_nodes` group is in inventory (should be `managers` + `workers`) 
- `swarm_iface` var is in inventory in `swarm_nodes` group vars if differents of `eth0`
- The `.vault_password` file exist containing the vault password used to encode your var (if don't exist remove `--vault-password-file .vault_password` to the command bellow)

```bash
cd ansible
ansible-playbook --ask-sudo-pass --vault-password-file .vault_password playbooks/swarm_configuration.yml
```

## Run docker swarm services with Ansible

The following playbook with launch all the services in your swarm cluster.

In order to use it, make sure that:
- `admin_user` var is in inventory for `all`
- `managers` group is in inventory (swarm managers)
- The `.vault_password` file exist containing the vault password used to encode your var (if don't exist remove `--vault-password-file .vault_password` to the command bellow)

```bash
ansible-playbook --ask-sudo-pass --vault-password-file .vault_password playbooks/launch_swarm_services.yml
```
