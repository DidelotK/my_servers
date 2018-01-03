# My servers configurations

## Summary
- [I/ Prerequisites](#prerequisites)
- [II/ Servers pre-configurations](#servers-pre-configurations)
- [III/ Servers configurations](#servers-configurations)
- [IV/ Tests with vagrant](#tests)
- [V/ More Information about the configurations](#more-info)

<a name="prerequisites"></a>
## I/ Prerequisites
- [1) Install Ansible](https://www.ansible.com/)
- [2) Install ssh server on servers (if necessary)](docs/install-ssh.md)
- [3) Encrypt admin password](docs/encrypt-admin-password.md)
- [4) Create vault variable](docs/ansible-vault.md)
- [5) Create needed ssh keys](docs/ssh-keys.md)
- [6) Update Ansible inventory](docs/update-ansible-inventory.md)
- [7) Install Ansible required roles](docs/install-ansible-required-roles.md)

<a name="servers-pre-configurations"></a>
## II/ Servers pre-configurations
- [1) Pre-configure servers with Ansible](docs/pre-configure-servers-with-ansible.md)

<a name="servers-configurations"></a>
## III/ Servers configurations
- [1) Configure servers with Ansible](docs/configure-servers-with-ansible.md)

<a name="tests"></a>
## IV/ Tests with vagrant
- [1) Install Virtualbox](https://www.virtualbox.org/)
- [2) Install Vagrant](https://www.vagrantup.com/) (with vagrant-reload plugin)
- [3) Install Ansible](https://www.ansible.com/)
- [4) Configure DNS](docs/dns-configuration.md)
- [5) Launch vm test](docs/launch-vm.md)
 
<b> Notes:</b>
- Your computer needs to have at least 12Go ram
- To install the vagrant plugin you can simply run this command:

<a name="more-info"></a>
## V/ More Information about the configurations

All the servers use docker for virtualization, this makes possible to subsequently migrate more easily to other solutions.

Follow this [link](docs/setup-jenkins.md) for more information about deployed containers
