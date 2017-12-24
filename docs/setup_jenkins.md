# Setup jenkins

## Set up SSH Private Key

First copy to clipboard your id_rsa private key you made earlier. It will be in: jenkins-slave/files/id_rsa
On the Jenkins landing page click on “Credentials”
Click on “Global credentials”
Click on “Add credentials”
From the drop down choose “SSH username with a private key”
In the “username” field type “jenkins”
Add a description of your choice (I like “Jenkins user private key for ephemeral build slaves”)
In the Private Key field, select “Enter directly” and paste in your id_rsa private key
Click “OK”

## Configure docker host

Click on “Manage Jenkins”
Click on “Configure System”
Scroll down until you find “Add new cloud” as a drop down (this comes from the Jclouds plugin)
Select “Docker” from the drop down

## More info in this tutorial
(not totally correct with this jenkins version)
https://engineering.riotgames.com/news/jenkins-ephemeral-docker-tutorial
