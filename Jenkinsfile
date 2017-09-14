def app

pipeline {

    agent {
        docker {
            image 'node:8.4'
            args "--volume /var/run/docker.sock:/var/run/docker.sock --volume /usr/bin/docker:/usr/bin/docker"
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
                        app = docker.build("didelotkev/react-app", "-f devOps/jenkins/webapp/Dockerfile .")
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