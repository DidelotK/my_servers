# IV/ Tests with vagrant
## 4) Configure DNS

Add those lines in our `/etc/hosts` in order to see the result on your web browser
(if you want to change the DNS you can change it in the following files `docker/controller/nginx/conf/*.conf`)

    192.168.50.51    cv.didelotkev.ovh
    192.168.50.51    jenkins.didelotkev.ovh
    192.168.50.51    grafana.didelotkev.ovh
    192.168.50.51    portainer.didelotkev.ovh
    192.168.50.50    webapp.didelotkev.ovh

<b>Next:</b> [Launch vm test](launch-vm.md)