# My servers configurations

<p align="center">
  <img src="docs/img/services.png"
  alt="Docker services"/>
</p>

## Summary
- [I/ Production](#production)
- [II/ Tests with vagrant](#tests)
- [III/ More Information about the configurations](#more-info)
- [IV/ Future evolutions](#todos)

<a name="production"></a>
## I/ Production
- [1) Install Ansible](https://www.ansible.com/)
- [2) Install ssh server on servers (if necessary)](docs/install-ssh.md)
- [3) Encrypt admin password](docs/encrypt-admin-password.md)
- [4) Specify docker daemon certificate passphrase](docs/docker-daemon-certificate.md)
- [5) (Optional) Create vault variable](docs/ansible-vault.md)
- [6) Create needed ssh keys](docs/ssh-keys.md)
- [7) Update Ansible inventory](docs/update-ansible-inventory.md)
- [8) Install Ansible required roles](docs/install-ansible-required-roles.md)
- [9) Pre-configure servers with Ansible](docs/pre-configure-servers-with-ansible.md)
- [10) Configure servers with Ansible](docs/configure-servers-with-ansible.md)

<a name="tests"></a>
## II/ Tests with vagrant
- [1) Install Virtualbox](https://www.virtualbox.org/)
- [2) Install Vagrant](https://www.vagrantup.com/)
- [3) Install Ansible](https://www.ansible.com/)
- [4) Configure DNS](docs/dns-configuration.md)
- [5) Encrypt admin password](docs/encrypt-admin-password.md)
- [6) Specify docker daemon certificate passphrase](docs/docker-daemon-certificate.md)
- [7) (Optional) Create vault variable](docs/ansible-vault.md)
- [8) Create needed ssh keys](docs/ssh-keys.md)
- [9) Install Ansible required roles](docs/install-ansible-required-roles.md)
- [10) Launch test VM](docs/launch-vm.md)
 
<b>Notes:</b>
- Your computer needs to have at least 12Go ram

<a name="more-info"></a>
## III/ More Information about the configurations

All the servers use docker for virtualization, this makes possible to subsequently migrate more easily to other solutions.

Follow this [link](docs/setup-jenkins.md) for more information about deployed containers

<a name="todos"></a>
## IV/ Future evolutions
- [TODOS](TODO.md)
