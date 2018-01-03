# I/ Prerequisites
## 2) Install ssh server on servers

This part is in case you don't have ssh server configured

## Install ssh server
    apt install openssh-server

## Configure ssh daemon

Open `/etc/ssh/sshd_config` and put the following options

    PasswordAuthentication no
    PermitRootLogin no
    
## Configure allowed ips

Open `/etc/hosts.allow` and ajust the following line with your ips

    ALL: your_ip
    ALL: 192.168.0.0/255.255.255.0

Open `/etc/hosts.deny` and ajust the following line to deny all other connexion

    ALL:ALL

## Bibliography
http://www.octetmalin.net/linux/tutoriels/ssh-fichier-etc-sshd_config-configuration-machine-serveur.php

TODO ANSIBLE PLAYBOOK

<b>Next:</b> [Create vault variable](encrypt-admin-password.md)
