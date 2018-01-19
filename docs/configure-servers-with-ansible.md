# III/ Servers configurations
## 1) Configure servers with Ansible

Launch servers configuration
```bash
ansible-playbook docker.nodes.configuration.yml --ask-sudo-pass -i ./inventories/production --vault-password-file .vault_password -e admin_user=admin
```

<b>Next:</b> [More Information about the configurations](../README.md#more-info)
