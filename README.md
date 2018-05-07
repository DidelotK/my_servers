# My servers configurations

<p align="center">
  <img src="docs/img/my_servers.png"
  alt="My servers architecture"/>
</p>

## Summary
- [I/ Presentation of the deployment](#presentation)
- [II/ Deploy on production](#production)
- [III/ Tests with vagrant](#tests)
- [IV/ Future evolutions](#todos)

<a name="presentation"></a>
## I/ Presentation of the deployment

TODOOOOOOOOOOOOO


<a name="production"></a>
## II/ Deploy on production

### Prerequisites
- [Ansible](https://www.ansible.com/)
- [Machines accessible via ssh](docs/install-ssh.md)

### Before provisioning
- [1) Create your credential file](docs/my-credentials.md)
- [2) Update Ansible inventory](docs/update-ansible-inventory.md)

### Launch provisioning
- [Launch provisioning with Ansible](docs/run-swarm-services-with-ansible.md)

<a name="tests"></a>
## III/ Tests with vagrant

### Prerequisites
- [Virtualbox](https://www.virtualbox.org/)
- [Vagrant](https://www.vagrantup.com/)
- [Ansible](https://www.ansible.com/)

### Before test
- [1) Create your credential file](docs/my-credentials.md)
- [2) Configure DNS](docs/dns-configuration.md)

### Launch test
[Launch test with vagrant](docs/launch-vm.md)
 
<b>Notes:</b>
- Your computer needs at least 16Go ram

<a name="todos"></a>
## IV/ Future evolutions
- [TODOS](TODO.md)
