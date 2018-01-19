# I/ Prerequisites
## 6) Update ansible inventory

Ansible need to know the hosts to launch the configuration so add
in the `ansible/inventory` file your hosts and the link to there ssh key like bellow:

    manager1 ansible_host=your_manager_ip # your manager ip (jenkins, grafana ...)
    
    [managers]
    manager1

    [swarm_nodes]
    managers
    
    [all]
    swarm_nodes
    
<b>Next:</b> [Install Ansible required roles](install-ansible-required-roles.md)