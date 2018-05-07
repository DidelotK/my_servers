## Create your credential file


During the provisioning Ansible is going to need sensitive information 
for the deployment of the cluster. Those information, goes from keys ssh used to connect to the waiter, 
up to the credentials to set up on the applications which will be installed. 
It is necessary to create a file `credentials.yml ` to define the sensitive variables 
there which will be afterward used during the deployment.

Here is the list of variables to define (this file is ignored by git);

```yaml
admin_user: # This user will be created on all nodes
admin_password:
admin_password_salt: salt # This salt will be then used to encrypt your password
admin_ssh_key_name: admin_id_rsa # The ssh key name used for connecting to servers (to put in ssh-keys directory, if don't exist this ssh key is generated)
admin_ssh_key_passphrase: # Used for creation of admin ssh key if not exist

docker_daemon_cert_passphrase: # The passphrase of the docker daemon cert (for tcp socket)
docker_daemon_passphrase:

jenkins_user:
jenkins_password:
jenkins_ssh_key_name: # This key will be used during jenkins build to connect to slave builder
jenkins_ssh_key_passphrase:

grafana_user:
grafana_password:

portainer_user:
portainer_password:

```
