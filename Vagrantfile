# -*- mode: ruby -*-
# vi: set ft=ruby

VAGRANT_COMMAND = ARGV[0]

# Vagrant configs
VAGRANT_VERSION = '2'

# Network configs
WEBAPP_IP = '192.168.50.50'
CONTROLLER_IP = '192.168.50.51'

# User configs
ADMIN_USER = 'admin'
ADMIN_PATH_SSH_KEY_PUBLIC = 'ssh-keys/admin_id_rsa.pub'
ADMIN_PATH_SSH_KEY_PRIVATE = 'ssh-keys/admin_id_rsa'

# Ansible configs
$ansible_extra_vars = {
    default_user: '',
    admin_user: ADMIN_USER
}
$ansible_host_vars = {
    controller: {
        ansible_host: CONTROLLER_IP,
        ansible_port: '22'
    },
    webapp: {
        ansible_host: WEBAPP_IP,
        ansible_port: '22'
    }
}
$ansible_groups = {
    controllers: %w(controller),
    all: %w(webapp controllers)
}

Vagrant.configure(VAGRANT_VERSION) do |config|

  # Connect ssh with admin user
  if VAGRANT_COMMAND == 'ssh'
    config.ssh.username = ADMIN_USER
    config.ssh.private_key_path = ADMIN_PATH_SSH_KEY_PRIVATE
    config.ssh.forward_agent = true
  end

  # Define webapp machine
  config.vm.define 'webapp' do |webapp|
    $ansible_extra_vars['default_user'] = 'ubuntu'

    webapp.vm.box = 'geerlingguy/ubuntu1604'
    webapp.vm.hostname = 'webapp'
    webapp.vm.network 'private_network', ip: WEBAPP_IP, :bridge => '127.0.0.1'
  end

  # Define controller machine
  config.vm.define 'controller' do |controller|
    $ansible_extra_vars['default_user'] = 'ubuntu'

    controller.vm.provider 'virtualbox' do |v|
      v.memory = 2048
      v.cpus = 2
    end

    controller.vm.box = 'geerlingguy/ubuntu1604'
    controller.vm.hostname = 'controller'
    controller.vm.network 'private_network', ip: CONTROLLER_IP, :bridge => '127.0.0.1'
  end

  # Initialize the machines with a new admin user
  config.vm.provision 'init', type: 'ansible' do |ansible_init|
    ansible_init.extra_vars = $ansible_extra_vars
    ansible_init.host_vars = $ansible_host_vars
    ansible_init.groups = $ansible_groups
    ansible_init.playbook = 'ansible/site.init.yml'
  end

  # Configure the machines depending on theirs roles
  config.vm.provision 'configuration', type: 'ansible' do |ansible_configuration|
    ansible_configuration.vault_password_file = 'ansible/.vault_password'
    ansible_configuration.extra_vars = $ansible_extra_vars
    ansible_configuration.host_vars = $ansible_host_vars
    ansible_configuration.groups = $ansible_groups
    ansible_configuration.playbook = 'ansible/site.configuration.yml'
  end

end
