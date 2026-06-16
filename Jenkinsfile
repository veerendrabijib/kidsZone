pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo '✅ Got all the code from GitHub!'
            }
        }

        stage('Node Version') {
            steps {
                bat 'node -v'
                bat 'npm -v'
                echo '✅ Checked what tools we have!'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install --legacy-peer-deps'
                echo '✅ Got all the LEGO pieces (with the magic fix)!'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
                echo '✅ Built the project successfully!'
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'dist/**/*', allowEmptyArchive: true
                echo '✅ Saved the build results!'
            }
        }
    }

    post {
        success {
            echo '🎉 YESSS! Build was AWESOME!'
        }
        failure {
            echo '❌ Oops! Something went wrong. Need help?'
        }
        always {
            cleanWs()
            echo '🧹 All cleaned up!'
        }
    }
}