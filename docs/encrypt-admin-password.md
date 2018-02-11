## Encrypt admin password

During the server initialization ansible will create a new user automatically. But to do so we need to provide it a password. Ansible needs the password to be encrypted with `openssl` .

Here is the command to encrypt your password correctly (replace `salt` and `password` with your values): 

```bash
openssl passwd -salt 'salt' -1 'password'
```

Then create a new file in `ansible/group_vars/all` named `vars.sentitive.yml` and put the following content:

    admin_user_password: <your_encrypted_password>
