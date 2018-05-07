## Create needed ssh keys

In order to make the application run correctly we have to create the following keys:

## SSH key to connect in servers (webapp, managers)

```bash
ssh-keygen -f ./ssh-keys/admin_id_rsa -b 4096 -t rsa -N <your-passphrase>

# Expected result:
    ssh-keys/admin_id_rsa
    ssh-keys/admin_id_rsa.pub
```
    
## SSH key to make jenkins master build in jenkins slave 

```bash
ssh-keygen -f ./ssh-keys/jenkins_id_rsa -t rsa -b 4096 -N <your-passphrase>
mv jenkins_id_rsa.pub authorized_keys
# Expected result:
    ssh-keys/jenkins_id_rsa
    ssh-keys/authorized_keys
```
