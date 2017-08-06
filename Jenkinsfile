pipeline {
	def app

    agent { docker 'node:7-onbuild' }
    stages {
    	stage('Clone repository') {
    		 /* Let's make sure we have the repository 
    		 *  cloned to our workspace */

        	checkout scm
    	}
        stage('build') {
			app = docker.build("didelotk/reactexpressapp")
        }
    }
}