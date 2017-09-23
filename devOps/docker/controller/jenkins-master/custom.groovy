#!groovy
import hudson.security.*
import jenkins.model.*
import jenkins.security.s2m.AdminWhitelistRule

def instance = Jenkins.getInstance()
def hudsonRealm = new HudsonPrivateSecurityRealm(false)
def users = hudsonRealm.getAllUsers()
def admin_username = "admin"
def admin_password = "admin"

instance.getDescriptor("jenkins.CLI").get().setEnabled(false)
instance.getInjector().getInstance(AdminWhitelistRule.class)
.setMasterKillSwitch(false)

users_s = users.collect { it.toString() }
if (admin_username in users_s) {
    println "Admin user already exists"
} else {
    println "--> creating local admin user"

    hudsonRealm.createAccount(admin_username, admin_password)
    instance.setSecurityRealm(hudsonRealm)

    def strategy = new FullControlOnceLoggedInAuthorizationStrategy()
    instance.setAuthorizationStrategy(strategy)
    instance.save()
}
