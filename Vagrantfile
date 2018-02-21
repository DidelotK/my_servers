# -*- mode: ruby -*-
# vi: set ft=ruby

VAGRANT_COMMAND = ARGV[0]

# Vagrant configs
VAGRANT_VERSION = '2'

# Network configs
MANAGER1_IP = '192.168.50.51'
WORKER1_IP  = '192.168.50.52'

# Machines configs
MANAGER1_RAM = 4096
MANAGER1_CPU = 2
WORKER1_RAM  = 4096
WORKER1_CPU  = 2

# User configs
ADMIN_USER                 = 'admin'
ADMIN_PATH_SSH_KEY_PUBLIC  = 'ssh-keys/admin_id_rsa.pub'
ADMIN_PATH_SSH_KEY_PRIVATE = 'ssh-keys/admin_id_rsa'

# Ansible configs
ANSIBLE_COMPATIBILITY_MODE  = '2.0'
ANSIBLE_VAULT_PASSWORD_PATH = './ansible/.vault_password'
$ansible_extra_vars = {
    default_user: '',
    admin_user: ADMIN_USER
}
$ansible_host_vars = {
    manager1: {
        ansible_host: MANAGER1_IP,
        ansible_port: '22'
    },
    worker1: {
        ansible_host: WORKER1_IP,
        ansible_port: '22'
    }
}
$ansible_groups = {
    managers: %w(manager1),
    workers: %w(worker1),
    swarm_nodes: %w(manager1 worker1),
    all: %w(swarm_nodes)
}

Vagrant.configure(VAGRANT_VERSION) do |config|
  # All the vm will run under the geerlingguy's ubuntu box (virtualbox, vmware supported)
  config.vm.box = 'geerlingguy/ubuntu1604'

  # Connect ssh with admin user
  if VAGRANT_COMMAND == 'ssh'
    config.ssh.username = ADMIN_USER
    config.ssh.private_key_path = ADMIN_PATH_SSH_KEY_PRIVATE
    config.ssh.forward_agent = true
  end

  # Define manager1 machine
  config.vm.define 'manager1' do |manager1|
    manager1.vm.hostname = 'manager1'
    manager1.vm.network 'private_network', ip: MANAGER1_IP, :bridge => '127.0.0.1'
    $ansible_extra_vars['default_user'] = 'ubuntu'

    manager1.vm.provider 'virtualbox' do |v|
      v.memory = MANAGER1_RAM
      v.cpus = MANAGER1_CPU
    end

    manager1.vm.provider 'vmware_fusion' do |v|
      v.vmx['memsize'] = MANAGER1_RAM
      v.vmx['numvcpus'] = MANAGER1_CPU
    end
  end

  # Define worker1 machine
  config.vm.define 'worker1' do |worker1|
    $ansible_extra_vars['default_user'] = 'ubuntu'
    worker1.vm.hostname = 'worker1'
    worker1.vm.network 'private_network', ip: WORKER1_IP, :bridge => '127.0.0.1'

    worker1.vm.provider 'virtualbox' do |v|
      v.memory = WORKER1_RAM
      v.cpus = WORKER1_CPU
    end

    worker1.vm.provider 'vmware_fusion' do |v|
      v.vmx['memsize'] = WORKER1_RAM
      v.vmx['numvcpus'] = WORKER1_CPU
    end
  end

  # Initialize the machines with a new admin user
  config.vm.provision 'init', type: 'ansible' do |ansible_init|
    if File.exist?(ANSIBLE_VAULT_PASSWORD_PATH)
      ansible_init.vault_password_file = ANSIBLE_VAULT_PASSWORD_PATH
    end

    ansible_init.compatibility_mode = ANSIBLE_COMPATIBILITY_MODE
    ansible_init.extra_vars = $ansible_extra_vars
    ansible_init.host_vars = $ansible_host_vars
    ansible_init.groups = $ansible_groups
    ansible_init.playbook = 'ansible/site.init.yml'
  end

  # Configure the docker nodes
  config.vm.provision 'configuration', type: 'ansible' do |ansible_configuration|
    if File.exist?(ANSIBLE_VAULT_PASSWORD_PATH)
      ansible_configuration.vault_password_file = ANSIBLE_VAULT_PASSWORD_PATH
    end

    ansible_configuration.compatibility_mode = ANSIBLE_COMPATIBILITY_MODE
    ansible_configuration.extra_vars = $ansible_extra_vars
    ansible_configuration.host_vars = $ansible_host_vars
    ansible_configuration.groups = $ansible_groups
    # ansible_configuration.tags = 'docker_services'
    ansible_configuration.playbook = 'ansible/docker.nodes.configuration.yml'
  end

  # Launch services on docker swarm cluster
  # config.vm.provision 'launch_services', type: 'ansible' do |ansible_launch_services|
  #   if File.exist?(ANSIBLE_VAULT_PASSWORD_PATH)
  #     ansible_launch_services.vault_password_file = ANSIBLE_VAULT_PASSWORD_PATH
  #   end
  #   ansible_launch_services.compatibility_mode = ANSIBLE_COMPATIBILITY_MODE
  #   ansible_launch_services.extra_vars = $ansible_extra_vars
  #   ansible_launch_services.host_vars = $ansible_host_vars
  #   ansible_launch_services.groups = $ansible_groups
  #   ansible_launch_services.playbook = 'ansible/docker.swarm.services.yml'
  # end

end
