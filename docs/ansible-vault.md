## Create vault variable

This project use ansible vault in order to encrypt sensible data.

So first create a `.vault_password` file in the `ansible` directory. This file will be used to encrypt/decrypt all the ansibled vaulted variables

The file should only contain one password.
   
    ansible-vault encrypt_string 'your_var'
    
Here is the list of variables to encrypt in the project with the above command:

    `dds_passphrase`


- Location: ansible/group-vars/manager.yml
- Aim: The passphrase used to create docker TLS certificates
