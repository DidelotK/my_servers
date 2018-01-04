# I/ Prerequisites
## 6) Update ansible inventory

Ansible need to know the hosts to launch the configuration so add
in the `ansible/inventory` file your hosts and the link to there ssh key like bellow:

    webserver ansible_host=your_webserver_ip # your webserver ip (webapp)
    controller ansible_host=your_controller_ip # your controller ip (jenkins, grafana ...)
    
    [controllers]
    controller

    [ec2]
    webserver
    
    [ec2:vars]
    ansible_ssh_private_key_file=./servers.pem
    
    [all]
    webserver
    controller
    
<b>Next:</b> [Install Ansible required roles](install-ansible-required-roles.md)