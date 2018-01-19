## Launch servers initialization (manager + webserver)

This playbook will setup the admin and add the ssh key to make managers deploy in webapp created before

```bash
cd ansible
ansible-playbook -i inventory --ask-sudo-pass --ask-vault-pass site.init.yml
```

## Launch servers configuration (manager + webserver)

This playbook will configure the following in the manager:
        
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
cd ansible
ansible-playbook -i inventory --ask-sudo-pass --ask-vault-pass site.configuration.yml
```


<b>Next:</b> [Servers configurations](../README.md#servers-configurations)
