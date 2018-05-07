#!groovy
import java.io.FileNotFoundException
import hudson.security.*
import hudson.security.csrf.DefaultCrumbIssuer
import jenkins.model.*
import jenkins.security.s2m.AdminWhitelistRule

def jenkinsInstance = Jenkins.getInstance()

def hudsonRealm = new HudsonPrivateSecurityRealm(false)
def strategy = new FullControlOnceLoggedInAuthorizationStrategy()
def users = hudsonRealm.getAllUsers()

String admin_username
String admin_password
try {
    String admin_username_secret = new File('/run/secrets/JENKINS_USER').getText('UTF-8')
    String admin_password_secret = new File('/run/secrets/JENKINS_PASSWORD').getText('UTF-8')

    admin_username = admin_username_secret
    admin_password = admin_password_secret
} catch(FileNotFoundException e) {
    admin_username = "admin"
    admin_password = "password"
}

// Disable remoting
jenkinsInstance.getDescriptor("jenkins.CLI").get().setEnabled(false)

// Enable Agent to master security subsystem
jenkinsInstance.getInjector().getInstance(AdminWhitelistRule.class).setMasterKillSwitch(false)

jenkinsInstance.setCrumbIssuer(new DefaultCrumbIssuer(true))

// Create default admin account
hudsonRealm.createAccount(admin_username, admin_password)
jenkinsInstance.setSecurityRealm(hudsonRealm)
jenkinsInstance.setAuthorizationStrategy(strategy)

// Disable old Non-Encrypted protocols
HashSet<String> newProtocols = new HashSet<>(jenkinsInstance.getAgentProtocols());
newProtocols.removeAll(Arrays.asList(
        "JNLP3-connect", "JNLP2-connect", "JNLP-connect", "CLI-connect"
));
jenkinsInstance.setAgentProtocols(newProtocols);

jenkinsInstance.save()
