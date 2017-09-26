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

        stage('Build React app') {
            steps {
                sh 'cd app/client && npm install && npm run build'
                script {
                    app = docker.build("didelotkev/react-app", "-f devOps/jenkins/webapp/Dockerfile . --tlsverify --tlscacert=/usr/local/etc/jenkins/certs/docker/ca.pem --tlscert=/usr/local/etc/jenkins/certs/docker/cert.pem --tlskey=/usr/local/etc/jenkins/certs/docker/key.pem -H=191.168.1.51:2376")
                }
            }
        }

        stage('Tests') {
            steps {
                sh "echo 'On fait des tes test de ouf ici'"
            }
        }

        stage('Push image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        app.push("latest")
                    }
                }     
            }

        }

        stage('Deploy') {
            when {
                branch 'prod'
            }
            steps {
                echo "Deploying"
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