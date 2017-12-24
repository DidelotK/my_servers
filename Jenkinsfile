def app

pipeline {

    agent {
        node {
            label "nodeslave"
        }
    }

    stages {

        stage('Clone project') {
            steps {
                checkout scm
            }
        }

        /*

        stage('Build React app') {
            steps {
                sh 'cd app/client && npm install && npm run build'
                sh 'docker --tlsverify --tlscacert=/usr/local/etc/jenkins/certs/docker/ca.pem --tlscert=/usr/local/etc/jenkins/certs/docker/cert.pem --tlskey=/usr/local/etc/jenkins/certs/docker/key.pem -H=192.168.50.51:2376 build -f devOps/docker/webapp/Dockerfile -t webapp .'
            }
        }

        stage('Tests') {
            steps {
                sh "echo 'On fait des test de ouf ici'"
            }
        }

        stage('Push image') {
            steps {
                sh "echo 'On push'"
            }

        }

        */

        stage('Deploy') {
            agent none

            when {
                branch 'jenkins-deploy'
            }
            steps {
                echo "Deploying to webapp server"
                sh "ls /usr/local/etc/jenkins/certs/docker"
            }
        }

    }

    post {
        success {
            echo "T'es un champion"
        }
        failure {
            echo "Une prochaine fois t'inquiète"
        }
    }

}