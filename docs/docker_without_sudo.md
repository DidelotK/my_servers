If you want to avoid typing sudo whenever you run the docker command, add your username to the docker group:
```sh
  $ sudo usermod -aG docker ${USER}
```
If you need to add a user to the docker group that you're not logged in as, declare that username explicitly using:
```sh
  $ sudo usermod -aG docker username
```
