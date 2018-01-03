# I/ Prerequisites
## 5) Create needed ssh keys

In order to make the application run correctly we have to create the following keys:

## SSH key to connect in servers (webapp, controllers)

```bash
ssh-keygen -f ./devOps/ssh-keys/admin_id_rsa -b 4096 -t rsa
# It will ask you a passphrase for the ssh key (don't let it empty for more safety)

# Expected result:
    devOps/ssh-keys/admin_id_rsa
    devOps/ssh-keys/admin_id_rsa.pub
```
 
## SSH key to make controllers deploy in webapp with ansible

```bash
ssh-keygen -f ./devOps/ssh-keys/webapp_id_rsa -t rsa -b 4096
# It will ask you a passphrase for the ssh key (don't let it empty for more safety)

# Expected result:
    devOps/ssh-keys/webapp_id_rsa
    devOps/ssh-keys/webapp_id_rsa.pub
```
    
## SSH key to make jenkins master build in jenkins slave 

```bash
cd devOps/docker/jenkins-node-slave/ssh-keys
ssh-keygen -f ./id_rsa -t rsa -b 4096
mv id_rsa.pub authorized_keys
# Expected result:
    devOps/docker/jenkins-node-slave/ssh-keys/id_rsa
    devOps/docker/jenkins-node-slave/ssh-keys/authorized_keys
```

<b>Next:</b> [Update Ansible inventory](update-ansible-inventory.md)