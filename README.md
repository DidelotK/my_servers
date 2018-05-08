# My servers configurations

<p align="center">
  <img src="docs/img/my_servers.png"
       width="500"
       alt="My servers architecture"/>
</p>
<a name="figure 1">Figure 1: Global representation</a>

## Summary
- [I/ Presentation of the project](#presentation)
- [II/ Deploy on production](#production)
- [III/ Tests with vagrant](#tests)
- [IV/ Future evolutions](#todos)

<a name="presentation"></a>
## I/ Presentation of the project

### Introduction

This project was born after an internship during which I worked as an engineer project.
During this internship I had the opportunity to discover a large number of tools which pleased me and that is why 
I decided to realize a simple architecture which would allow me to deploy them, have fun and also train me on every
technology of the ecosystem.

### Aimed architecture

The evolution of the IT world makes that more and more companies meet needs for suppleness in the deployment of application.
I thus stood out constraints to make a project closer to the real world.
The first constraint that I stood out was to set up the high availability application level.
It was thus necessary to duplicates machines to avoid any break of service if a machine came to fall.

The most basic and most traditional architecture which I would have been able to choose and the implementation 
is the us of a haproxy in front of two clones servers. 
This solution showed these ability but it did not please me, indeed I wanted to test the solutions of clustering 
but especially I wanted more agile architecture, which would have the possibility of evolving more easily according 
to the future needs in load.

There are several solutions to realize application clusters. 
I was especially interested in two solutions which are: Kubernetes and Docker Swarm. 
These two solutions more interested me that the others for the simple and good reason than I wanted to containerize my applications. 
The fact to containerize the applications allows to keep a clean host of any installation (except docker), 
the application is isolated and does not depend anymore on the operating system of the host. 
The containerisation also allows the migration of an application version to an other one with no problem at all.

The solution which I held contrary to all expectations is Swarm.
The implementation of the cluster Kubernetes can be very fastidious, yet the purpose of my first project is to test the ecosystem,
I preferred to make an a little less good choice on the architectural side to be able to dedicate me to the real problem.

Here is the current application architecture of the cluster that I organized to assure the redundancy.

<p align="center">
  <img src="docs/img/app_arch.png"
  alt="app arch"/>
</p>
<a name="figure 2">Figure 2: Applicative representation</a>

Every brick is a service answered in the cluster. Certain managers of the cluster are tagged has haproxies. 
These haproxies possess a VIP attributed thanks to Keepalived (which at the moment is hard settled on machines. 
This will evolve certainly in the next updates).
Haproxy possesses a dynamic configuration which allows to discover automatically all the nginx pods
(this is possible thanks to the sharing of sock docker in containers, it is the main reason which made that haproxys nodes are managers).
 Finally the nginx nodes manages to communicate with the other services thanks to a global network docker.
 This network is managed by swarm, it makes itself the load balancing in mode round Robin.

Here is a network more directed networks to understand better the functioning explained above.

<p align="center">
  <img src="docs/img/network_arch.png"
  alt="network arch"/>
</p>
<a name="figure 3">Figure 3: Network representation</a>

### Spread services

The services spread on the cluster are organized in the form of stack Swarm.
Every stack contains a very precise function. At the moment here are stacks available on the cluster:

#### Ingress stack

This stack is one of the most important of the infrastructure, indeed it is this stack which is going to manage the 
taken out entrances to the cluster (it is represented on the figure 3).

#### Monitoring stack

This stack consists of Grafana, Prometheus, nodeExporter, caAdvisor allows to visualize in real time the state of the cluster on dashboards. 
It also allows to set up alerts which can be exploited in case of breakdown.

#### Continuous integration stack

This stack is still in the course of improvement, at the moment it consists of Jenkins. 
In the future tools as stackstorm or rundeck will maybe come to be transplanted in order to make job when grafana will create alerts.

#### Applicatives stacks

This stacks will be stacks created by the continuos integration stack, they will be consisted of web/bdd or just application 
of the tests which I would like to realize.

### Used tools for deployment

For the deployment of all this infrastructure, I chose the following tools:

#### Vagrant

Vagrant is a tool of HashiCorp which allows to speak to hypersights to fund among others of the vm. 
It is very useful to make tests before sending them to production.

#### Packer

Packer is another tool of HashiCorp which allows to generate in the air images under the wished format.
I use personally Packer to re-package the images of my servers, with the ssh well configured and the repos up to date.

#### Ansible

Ansible is a tool which allows among others to fund and to configure the servers of an idempotente way.

#### Terraform

Terraform is also a HashiCorp tool, he allows to make infra as a code and thus to fund a complete infrastructure 
thanks to declarative files.

<b>Note: </b> Ansible in the last versions (in particular since 2.5) Allow to make a big quantity of thing that Terraform make.
However Terraform is more complete tool for this kind of problem (IAAC)

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
