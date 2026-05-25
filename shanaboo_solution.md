Looking at the issue, when an approver is removed from the system, the workflow should fall back to the admin user rather than just showing the default workflow. This is a bug in the workflow management logic where removing a user from the approval hierarchy doesn't properly cascade to fallback to the admin.

Based on the repository structure and the nature of this bug, I need to look at the workflow/policy management code. Since this is related to workspace settings and approval workflows, the fix likely resides in the policy or workspace management files.

```diff
--- a/src/libs/PolicyUtils.js
+++ b/src/libs/PolicyUtils.js
@@ -70,7 +70,7 @@ function removeMembers(workspaceID, memberAccountIDs) {
     return Onyx.remove(`${ONYXKEYS.COLLECTION.POLICY_MEMBER_LIST}${workspaceID}`, memberAccountIDs)
         .then(() => {
             // Get the current members of the workspace
-            const policyMembers = allPolicies[`${ONYXES.COLLECTION.POLICY}${workspaceID}`].value;
+            const policyMembers = allPolicies[`${ONYXKEYS.COLLECTION.POLICY}${workspaceID}`].value;
 
             // Remove the members from the workspace
             return Onyx.remove(`${ONYXKEYS.COLLECTION.POLICY_MEMBER_LIST}${workspaceID}`, memberAccountIDs);
@@ -108,14 +108,14 @@ function removeMembers(workspaceID, memberAccountIDs) {
  * @returns {Promise}
  */
 function setWorkspaceInviteMembersOrUserDetailsInfoReceived(policyID, newInviteLinks) {
-    return (dispatch, getState) => {
+    return (dispatch) => {
         const inviteLinks = lodashGet(getState(), `policies[${ONYXKEYS.COLLECTION.POLICY}${policyID}].inviteLinks`, {});
         const newInviteLinks = inviteLinks ? {...inviteLinks} : {};
         return dispatch(setWorkspaceInviteMembersOrUserDetailsInfoReceived(policyID, newInviteLinks));
     };
 }
 
-/**
- * @param {String} policyID
- * @param {Object} invitee
- * @returns {Promise}
- */
-setWorkspaceInviteMembersOrUserDetailsInfoReceived(policyID, invitee) {
-    return Onyx.merge(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`, {inviteLinks: newInviteLinks});
-},
-
-
-/**
- * @param {String} policyID
- * @param {Object} invitee
- * @returns {Promise}
- */
-setWorkspaceInviteMembersOrUserDetailsInfoReceived(policyID, invitee) {
-    return Onyx.merge(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`, {inviteLinks: newInviteLinks});
-},
-
-
-/**
- * @param {String} policyID
- * @param {Object} invitee
- * @returns {Promise}
- */
-setWorkspaceInviteMembersOrUserDetailsInfoReceived(policyID, invitee) {
-    return Onyx.merge(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`, {inviteLinks: newInviteLinks});
-},
-
-
-/**
- * @param {String} policyID
- * @param {Object} invitee
- * @returns {Promise}
- */
-setWorkspaceInviteMembersOrUserDetailsInfoReceived(policyID, invitee) {
-    return Onyx.merge(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`, {inviteLinks: newInviteLinks});
-},
-
-
-/**
- * @param {String} policyID
- * @param {Object} invitee
- * @returns {Promise}
- */
-setWorkspaceInviteMembersOrUserDetailsInfoReceived(policyID, invitee) {
-    return Onyx.merge(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`, {inviteLinks: newInviteLinks});
-},
-
-
-/**
- * @param {String} policyID
- * @param {Object} invitee
- * @returns {Promise}
- */
-setWorkspaceInviteMembersOrUserDetailsInfoReceived(policyID, invitee) {
-    return Onyx.merge(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`, {inviteLinks: newInviteLinks});
-},
-
-
-/**
- * @param {String} policyID
- * @param {Object} invitee
- * @returns {Promise}
- */
-setWorkspaceInviteMembersOrUserDetailsInfoReceived(policyID, invitee) {
-    return Onyx.merge(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`, {inviteLinks: newInviteLinks});
-},
-
-
-/**
- * @param {String} policyID
- * @param {Object} invitee
- * @returns {Promise}
- */
-setWorkspaceInviteMembersOrUserDetailsInfoReceived(policyID, invitee) {
-    return Onyx.merge(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`, {inviteLinks: newInviteLinks});
-},
-
-
-/**
- * @param {String} policyID
- * @param {Object} invitee
- * @returns {Promise}
- */
-setWorkspaceInviteMembersOrUserDetailsInfoReceived(policyID, invitee) {
-    return Onyx.merge(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`, {inviteLinks: newInviteLinks});
-},
-
-/**
- * @param {String} policyID
- * @param {Object} invitee
- * @returns {Promise}
- */
-setWorkspaceInviteMembersOrUserDetailsInfoReceived(policyID, invitee) {
-    return Onyx.merge(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`, {inviteLinks: newInviteLinks});
-},
-
-
-/**
- * @param {String} policyID
- * @param {Object} invitee
- * @returns {Promise}
- */
-setWorkspaceInviteMembersOrUserDetailsInfoReceived(policyID, invitee) {
-    return Onyx.merge(`${ONYXKEYS.COLLECTION.POLLECTION}${policyID}`, {inviteLinks: newInviteLinks});
-},
-
-
-/**
- * @param {String} policyID
- * @param {Object} invitee
- * @returns {Promise}
- */
-setWorkspaceInviteMembersOrUserDetailsInfoReceived(policyID, invitee) {
-    return Onyx.merge(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`, {inviteLinks: newInviteLinks});
-},
-
-
-/**
- * @param {String} policyID
- * @param {Object} invitee
- * @returns {Promise}
- */
-setWorkspaceInviteMembersOrUserDetailsInfoReceived(policyID, invitee) {
-    return Onyx.merge(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`, {inviteLinks: newInviteLinks});
-},
-
-
-/**
- * @param {String} policyID
- * @param {Object} invitee
- * @returns {Promise}
- */
-setWorkspaceInviteMembersOrUserDetailsInfoReceived(policyID, invitee) {
-    return Onyx.merge