# -*- mode: ruby -*-
# vi: set ft=ruby

VAGRANT_COMMAND = ARGV[0]

# Vagrant configs
VAGRANT_VERSION = '2'

# Network configs
MANAGER1_IP = '192.168.50.53'
WORKER1_IP  = '192.168.50.52'
WORKER2_IP  = '192.168.50.54'
HAPROXY1_IP  = '192.168.50.61'
HAPROXY2_IP  = '192.168.50.62'

# Machines configs
MANAGER1_RAM = 2048
MANAGER1_CPU = 2
WORKER1_RAM  = 4096
WORKER1_CPU  = 2
WORKER2_RAM  = 4096
WORKER2_CPU  = 2
# Manager for haproxy
HAPROXY1_RAM  = 1024
HAPROXY1_CPU  = 2
HAPROXY2_RAM  = 1024
HAPROXY2_CPU  = 2

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
  end

  # Define worker2 machine
  config.vm.define 'worker2' do |worker2|
    worker2.vm.network 'private_network', ip: WORKER2_IP, :bridge => '127.0.0.1'

    worker2.vm.provider 'virtualbox' do |v|
      v.memory = WORKER2_RAM
      v.cpus = WORKER2_CPU
    end

    worker2.vm.provider 'vmware_fusion' do |v|
      v.vmx['memsize'] = WORKER2_RAM
      v.vmx['numvcpus'] = WORKER2_CPU
    end
  end

  # Define haproxy1 machine
  config.vm.define 'haproxy1' do |haproxy1|
    haproxy1.vm.network 'private_network', ip: HAPROXY1_IP, :bridge => '127.0.0.1'

    haproxy1.vm.provider 'virtualbox' do |v|
      v.memory = HAPROXY1_RAM
      v.cpus = HAPROXY1_CPU
    end

    haproxy1.vm.provider 'vmware_fusion' do |v|
      v.vmx['memsize'] = HAPROXY1_RAM
      v.vmx['numvcpus'] = HAPROXY1_CPU
    end
  end

  # Define haproxy2 machine
  config.vm.define 'haproxy2' do |haproxy2|
    haproxy2.vm.network 'private_network', ip: HAPROXY2_IP, :bridge => '127.0.0.1'

    haproxy2.vm.provider 'virtualbox' do |v|
      v.memory = HAPROXY2_RAM
      v.cpus = HAPROXY2_CPU
    end

    haproxy2.vm.provider 'vmware_fusion' do |v|
      v.vmx['memsize'] = HAPROXY2_RAM
      v.vmx['numvcpus'] = HAPROXY2_CPU
    end

    ##############################
    #
    #   Ansible provisioning
    #
    ##############################configure_keepalived
    # Note: Ansible is started in the last machine because vagrant does not support
    # parallel multi-machine provisioning yet (https://github.com/hashicorp/vagrant/issues/1784)


    # Pre-configure the machines
    config.vm.provision 'servers_preconfiguration', type: 'ansible' do |ansible_servers_preconfiguration|
      if File.exist?(ANSIBLE_VAULT_PASSWORD_PATH)
        ansible_servers_preconfiguration.vault_password_file = ANSIBLE_VAULT_PASSWORD_PATH
      end

      ansible_servers_preconfiguration.limit = "all,localhost"
      ansible_servers_preconfiguration.force_remote_user = false
      ansible_servers_preconfiguration.config_file = ANSIBLE_CONFIG_FILE_PATH
      ansible_servers_preconfiguration.inventory_path = ANSIBLE_INIT_INVENTORY_PATH
      ansible_servers_preconfiguration.compatibility_mode = ANSIBLE_COMPATIBILITY_MODE
      ansible_servers_preconfiguration.verbose = "false"
      ansible_servers_preconfiguration.playbook = 'ansible/playbooks/servers_preconfiguration.yml'
    end

    # Install docker (with docker compose) on nodes
    config.vm.provision 'docker_installation', type: 'ansible' do |ansible_docker_installation|
      if File.exist?(ANSIBLE_VAULT_PASSWORD_PATH)
        ansible_docker_installation.vault_password_file = ANSIBLE_VAULT_PASSWORD_PATH
      end
      ansible_docker_installation.limit = "all,localhost"
      ansible_docker_installation.force_remote_user = false
      ansible_docker_installation.config_file = ANSIBLE_CONFIG_FILE_PATH
      ansible_docker_installation.inventory_path = ANSIBLE_CONFIG_INVENTORY_PATH
      ansible_docker_installation.compatibility_mode = ANSIBLE_COMPATIBILITY_MODE
      ansible_docker_installation.verbose = "false"
      # ansible_docker_installation.tags = 'docker_services'
      ansible_docker_installation.playbook = 'ansible/playbooks/docker_installation.yml'
    end

    # Configure docker swarm on cluster
    config.vm.provision 'swarm_configuration', type: 'ansible' do |ansible_swarm_configuration|
      if File.exist?(ANSIBLE_VAULT_PASSWORD_PATH)
        ansible_swarm_configuration.vault_password_file = ANSIBLE_VAULT_PASSWORD_PATH
      end
      ansible_swarm_configuration.limit = "all,localhost"
      ansible_swarm_configuration.force_remote_user = false
      ansible_swarm_configuration.config_file = ANSIBLE_CONFIG_FILE_PATH
      ansible_swarm_configuration.inventory_path = ANSIBLE_CONFIG_INVENTORY_PATH
      ansible_swarm_configuration.compatibility_mode = ANSIBLE_COMPATIBILITY_MODE
      ansible_swarm_configuration.verbose = "false"
      # ansible_swarm_configuration.tags = 'docker_services'
      ansible_swarm_configuration.playbook = 'ansible/playbooks/swarm_configuration.yml'
    end

    # Launch services on swarm cluster
    config.vm.provision 'launch_services', type: 'ansible' do |ansible_launch_services|
      if File.exist?(ANSIBLE_VAULT_PASSWORD_PATH)
        ansible_launch_services.vault_password_file = ANSIBLE_VAULT_PASSWORD_PATH
      end
      ansible_launch_services.limit = "all,localhost"
      ansible_launch_services.force_remote_user = false
      ansible_launch_services.config_file = ANSIBLE_CONFIG_FILE_PATH
      ansible_launch_services.inventory_path = ANSIBLE_CONFIG_INVENTORY_PATH
      ansible_launch_services.compatibility_mode = ANSIBLE_COMPATIBILITY_MODE
      ansible_launch_services.verbose = "false"
      ansible_launch_services.playbook = 'ansible/playbooks/launch_swarm_services.yml'
    end

    # Configure keepalived on haproxys
    config.vm.provision 'configure_keepalived', type: 'ansible' do |ansible_configure_keepalived|
      if File.exist?(ANSIBLE_VAULT_PASSWORD_PATH)
        ansible_configure_keepalived.vault_password_file = ANSIBLE_VAULT_PASSWORD_PATH
      end
      ansible_configure_keepalived.limit = "all,localhost"
      ansible_configure_keepalived.force_remote_user = false
      ansible_configure_keepalived.config_file = ANSIBLE_CONFIG_FILE_PATH
      ansible_configure_keepalived.inventory_path = ANSIBLE_CONFIG_INVENTORY_PATH
      ansible_configure_keepalived.compatibility_mode = ANSIBLE_COMPATIBILITY_MODE
      ansible_configure_keepalived.verbose = "false"
      ansible_configure_keepalived.playbook = 'ansible/playbooks/keepalived_installation.yml'
    end

  end

end
