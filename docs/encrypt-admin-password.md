# I/ Prerequisites
## 3) Admin user password

During the server initialization ansible will create a new user automatically. But to do so we need to provide it a password. Ansible needs the password to be encrypted with `openssl` .

Here is the command to encrypt your password correctly (replace `salt` and `password` with your values): 

```bash
openssl passwd -salt 'salt' -1 'password'
```

Then replace `admin_user_password` in `devOps/ansible/group_vars/all.yml` by the result of the above command.

<b>Next:</b> [Create vault variable](ansible-vault.md)