## Create vault variable

You can use ansible vault in order to encrypt sensitive data.

So first create a `.vault_password` file in the `ansible` directory.

The file should only contain one password.

Then encrypt all the data that you want

### Encrypt string

```bash
ansible-vault encrypt_string '<your-var-to-encrypt>' --vault-password-file='<path-to-vault-password-file>'
```

### Encrypt file (recommended)

```bash
ansible-vault encrypt '<path-to-file-to-encrypt>' --vault-password-file='<path-to-vault-password-file>'
```

<b>Note:</b> If you fork this project, be aware that all files having `.sensitive.yml` extension will not be commited (more secure)
