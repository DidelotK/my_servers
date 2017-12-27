#!groovy
import hudson.security.*
import hudson.security.csrf.DefaultCrumbIssuer
import jenkins.model.*
import jenkins.security.s2m.AdminWhitelistRule

def instance = Jenkins.getInstance()

def hudsonRealm = new HudsonPrivateSecurityRealm(false)
def strategy = new FullControlOnceLoggedInAuthorizationStrategy()
def users = hudsonRealm.getAllUsers()
def admin_username = "admin"
def admin_password = "admin"

instance.getDescriptor("jenkins.CLI").get().setEnabled(false)
instance.getInjector().getInstance(AdminWhitelistRule.class)
.setMasterKillSwitch(false)
instance.setCrumbIssuer(new DefaultCrumbIssuer(true))

hudsonRealm.createAccount(admin_username, admin_password)
instance.setSecurityRealm(hudsonRealm)

instance.setAuthorizationStrategy(strategy)

instance.save()
