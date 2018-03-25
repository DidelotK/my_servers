# -*- mode: ruby -*-
# vi: set ft=ruby

VAGRANT_COMMAND = ARGV[0]

# Vagrant configs
VAGRANT_VERSION = '2'

# Network configs
MANAGER1_IP = '192.168.50.53'
WORKER1_IP  = '192.168.50.52'

# Machines configs
MANAGER1_RAM = 4096
MANAGER1_CPU = 2
WORKER1_RAM  = 4096
WORKER1_CPU  = 2

# User configs
ADMIN_USER                 = 'admin'
ADMIN_PATH_SSH_KEY_PRIVATE = 'ssh-keys/admin_id_rsa'

# Ansible configs
ANSIBLE_COMPATIBILITY_MODE  = '2.0'
ANSIBLE_CONFIG_FILE_PATH = './ansible/ansible.cfg'
ANSIBLE_INIT_INVENTORY_PATH = './ansible/inventories/staging/init.hosts'
ANSIBLE_CONFIG_INVENTORY_PATH = './ansible/inventories/staging/config.hosts'
ANSIBLE_VAULT_PASSWORD_PATH = './ansible/.vault_password'


Vagrant.configure(VAGRANT_VERSION) do |config|
  # All the vm will run under the geerlingguy's ubuntu box (virtualbox, vmware supported)
  config.vm.box = 'geerlingguy/ubuntu1604'
  config.ssh.forward_agent = true

  # Connect ssh with admin user
  if VAGRANT_COMMAND == 'ssh'
    config.ssh.username = ADMIN_USER
    config.ssh.private_key_path = ADMIN_PATH_SSH_KEY_PRIVATE
  end

  # Define manager1 machine
  config.vm.define 'manager1' do |manager1|
    manager1.vm.network 'private_network', ip: MANAGER1_IP, :bridge => '127.0.0.1'

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
    worker1.vm.network 'private_network', ip: WORKER1_IP, :bridge => '127.0.0.1'

    worker1.vm.provider 'virtualbox' do |v|
      v.memory = WORKER1_RAM
      v.cpus = WORKER1_CPU
    end

    worker1.vm.provider 'vmware_fusion' do |v|
      v.vmx['memsize'] = WORKER1_RAM
      v.vmx['numvcpus'] = WORKER1_CPU
    end


    ##############################
    #
    #   Ansible provisioning
    #
    ##############################
    # Note: Ansible is started in the last machine because vagrant does not support
    # parallel multi-machine provisioning yet (https://github.com/hashicorp/vagrant/issues/1784)


    # Initialize the machines with a new admin user
    config.vm.provision 'init', type: 'ansible' do |ansible_init|
      if File.exist?(ANSIBLE_VAULT_PASSWORD_PATH)
        ansible_init.vault_password_file = ANSIBLE_VAULT_PASSWORD_PATH
      end

      ansible_init.limit = "all"
      ansible_init.force_remote_user = false
      ansible_init.config_file = ANSIBLE_CONFIG_FILE_PATH
      ansible_init.inventory_path = ANSIBLE_INIT_INVENTORY_PATH
      ansible_init.compatibility_mode = ANSIBLE_COMPATIBILITY_MODE
      ansible_init.verbose = "false"
      ansible_init.playbook = 'ansible/playbooks/site.init.yml'
    end

    # Configure the docker nodes
    config.vm.provision 'configuration', type: 'ansible' do |ansible_configuration|
      if File.exist?(ANSIBLE_VAULT_PASSWORD_PATH)
        ansible_configuration.vault_password_file = ANSIBLE_VAULT_PASSWORD_PATH
      end
      ansible_configuration.limit = "all"
      ansible_configuration.force_remote_user = false
      ansible_configuration.config_file = ANSIBLE_CONFIG_FILE_PATH
      ansible_configuration.inventory_path = ANSIBLE_CONFIG_INVENTORY_PATH
      ansible_configuration.compatibility_mode = ANSIBLE_COMPATIBILITY_MODE
      ansible_configuration.verbose = "false"
      # ansible_configuration.tags = 'docker_services'
      ansible_configuration.playbook = 'ansible/playbooks/docker.nodes.configuration.yml'
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
    #   ansible_launch_services.playbook = 'ansible/playbooks/docker.swarm.services.yml'
    # end

  end

end
