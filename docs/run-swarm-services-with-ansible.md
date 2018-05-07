## Install the local requirements

This playbook will install all the requirements to run the others playbook.

Will be installed/created:
  - ansible roles
  - admin ssh key if don't exist in ssh_keys directory
  - jenkins ssh key if don't exist in ssh_keys directory

```bash
cd ansible
ansible-playbook -e "@../credentials.yml" playbooks/local_requirements.yml
```

## Pre-configure servers with Ansible

The following playbook will setup the admin and add the ssh key to make managers deploy in webapp created before

In order to use it, make sure that:
- `admin_user` var is in inventory for `all`
- `path_to_ssh_admin_public_keys` var is in inventory for `all`

```bash
cd ansible
ansible-playbook -e "@../credentials.yml" -i inventories/production/init.hosts --ask-sudo-pass playbooks/servers_preconfiguration.yml
```

## Install docker on servers

This playbook will configure the following in the manager:
        
    - Install pip
    - Install docker
    - Configure docker daemon (tls)
    - Install docker compose

In order to use it, make sure that:
- `admin_user` var is in inventory for `all`

```bash
cd ansible
ansible-playbook -e "@../credentials.yml" --ask-sudo-pass playbooks/docker_installation.yml
```

## Configure swarm cluster

The following playbook with create configure the swarm cluster.

In order to use it, make sure that:
- `admin_user` var is in inventory for `all`
- `managers` group is in inventory
- `workers` group is in inventory
- `swarm_nodes` group is in inventory (should be `managers` + `workers`) 
- `swarm_iface` var is in inventory in `swarm_nodes` group vars if differents of `eth0`

```bash
cd ansible
ansible-playbook -e "@../credentials.yml" --ask-sudo-pass playbooks/swarm_configuration.yml
```

## Run docker swarm services with Ansible

The following playbook with launch all the services in your swarm cluster.

In order to use it, make sure that:
- `admin_user` var is in inventory for `all`
- `managers` group is in inventory (swarm managers)

```bash
ansible-playbook -e "@../credentials.yml" --ask-sudo-pass playbooks/launch_swarm_services.yml
```
