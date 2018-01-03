# I/ Prerequisites
## 4) Create vault variable

This project use ansible vault in order to encrypt sensible data.

So first create a `.vault_password` file in the `devOps/ansible` directory. This file will be used to encrypt/decrypt all the ansibled vaulted variables

The file should only contain one password

<b>.vault_password example:</b>
    
    yourpassword

Here is the list of variables to encrypt in the project

    dds_passphrase:
        Location: devOps/ansible/group-vars/controller.yml
        Aim: The passphrase used to create docker TLS certificates

<b>Next:</b> [Create needed ssh keys](ssh-keys.md)