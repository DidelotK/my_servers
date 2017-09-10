pipeline {

    environment {
        NODE_ENV = 'production'
    }

    agent { docker 'node:8.4' }

    stages {

        stage('Clone project') {
            steps {
                checkout scm
            }
        }

        stage('Build React app') {
            steps {
                sh 'npm cache clean --force'
                sh 'cd app/client && npm install && npm run build'
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