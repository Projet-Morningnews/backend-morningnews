pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    env.APP_GIT_HASH = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                }
                echo 'Building...'
                echo scm.branches[0].name
                echo "${env.APP_GIT_HASH}"
            }
        }

        stage('Test') {
            steps {
                echo 'Testing...'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}
