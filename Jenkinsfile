pipeline {

    environment {
        NODE_ENV = 'production'
    }

    agent { docker 'node:6.3' }

    checkout scm

    stages {

        stage('Build React app') {
            steps {
                sh 'cd app/client'
                sh 'npm install'
                sh 'npm run build'
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