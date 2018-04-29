#!groovy
import hudson.security.*
import hudson.security.csrf.DefaultCrumbIssuer
import jenkins.model.*
import jenkins.security.s2m.AdminWhitelistRule

def jenkinsInstance = Jenkins.getInstance()

def hudsonRealm = new HudsonPrivateSecurityRealm(false)
def strategy = new FullControlOnceLoggedInAuthorizationStrategy()
def users = hudsonRealm.getAllUsers()
def admin_username = "admin"
def admin_password = "admin"

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
