pipeline {
    environment {
        NODE_ENV = 'production'
    }

    agent { docker 'node:6.11' }

    stages {
        stage('Clone repository') {
            steps {
                /* Let's make sure we have the repository 
                *  cloned to our workspace */

                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'echo "coucou"'
                sh 'ls'
                sh 'pwd'
            }
        }

        stage('Build docker image') {
            steps {
                script {
                    docker.build("didelotk/reactexpressapp")
                }
            }
        }
    }
}