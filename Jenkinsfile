pipeline {

    environment {
        NODE_ENV = 'production'
    }

    agent any

    stages {

        stage('Clone repository') {
            steps {
                /* Let's make sure we have the repository 
                *  cloned to our workspace */

                checkout scm
            }
        }

        stage('Launch docker compose') {
            steps {
                sh 'ls'
                sh 'cd docker/webapp'
                sh 'docker-compose up -d'
            }
        }

        stage('Deploy') {
            when {
                allOf {
                    branch 'prod'
                    environment name: 'NODE_ENV', value: 'production'
                }
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