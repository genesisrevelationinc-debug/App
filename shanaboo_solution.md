```diff
--- a/src/CONST.ts
+++ b/src/CONST.ts
@@ -1234,6 +1234,7 @@
         VERIFIED: 'verified',
         RERUN_ONBOARDING: 'rerunOnboarding',
         ACTION_REQUIRED: 'actionRequired',
+        GLOBAL_REIMBURSEMENT_BANK_ACCOUNT_SIGNER: 'globalReimbursementBankAccountSigner',
     },
 
     ONYXKEYS: {
@@ -1256,6 +1257,7 @@
         NVP_ONBOARDING: 'nvp_onboarding',
         NVP_ONBOARDING_PURPOSE: 'nvp_onboarding_purpose',
         NVP_TRYNEWDOT: 'nvp_tryNewDot',
+        NVP_GLOBAL_REIMBURSEMENT_BANK_ACCOUNT_SIGNER: 'nvp_globalReimbursementBankAccountSigner',
 
         // This is an object with UTM params that we use to handle certain navigation logic (like redirects to OldDot)
         NVP_INTRO_SELECTED: {
@@ -1274,6 +1276,7 @@
             INTRO_SELECTED: 'private_introSelected',
             ONBOARDING: 'private_onboarding',
             TRYNEWDOT: 'private_tryNewDot',
+            GLOBAL_REIMBURSEMENT_BANK_ACCOUNT_SIGNER: 'private_globalReimbursementBankAccountSigner',
         },
 
         // This is an object with UTM params that we use to handle certain navigation logic (like redirects to OldDot)
@@ -1294,6 +1297,7 @@
             NVP_ONBOARDING: 'private_onboarding',
             NVP_ONBOARDING_PURPOSE: 'private_onboarding_purpose',
             NVP_TRYNEWDOT: 'private_tryNewDot',
+            NVP_GLOBAL_REIMBURSEMENT_BANK_ACCOUNT_SIGNER: 'private_globalReimbursementBankAccountSigner',
         },
 
         // Deprecated Onyx keys
@@ -1314,6 +1318,7 @@
             NVP_ONBOARDING: 'nvp_onboarding',
             NVP_ONBOARDING_PURPOSE: 'nvp_onboarding_purpose',
             NVP_TRYNEWDOT: 'nvp_tryNewDot',
+            NVP_GLOBAL_REIMBURSEMENT_BANK_ACCOUNT_SIGNER: 'nvp_globalReimbursementBankAccountSigner',
         },
 
         // Deprecated Onyx keys
@@ -1334,6 +1339,7 @@
             NVP_ONBOARDING: 'nvp_onboarding',
             NVP_ONBOARDING_PURPOSE: 'nvp_onboarding_purpose',
             NVP_TRYNEWDOT: 'nvp_tryNewDot',
+            NVP_GLOBAL_REIMBURSEMENT_BANK_ACCOUNT_SIGNER: 'nvp_globalReimbursementBankAccountSigner',
         },
 
         // Deprecated Onyx keys
@@ -1354,6 +1360,7 @@
             NVP_ONBOARDING: 'nvp_onboarding',
             NVP_ONBOARDING_PURPOSE: 'nvp_onboarding_purpose',
             NVP_TRYNEWDOT: 'nvp_tryNewDot',
+            NVP_GLOBAL_REIMBURSEMENT_BANK_ACCOUNT_SIGNER: 'nvp_globalReimbursementBankAccountSigner',
         },
 
         // Deprecated Onyx keys
@@ -1374,6 +1381,7 @@
             NVP_ONBOARDING: 'nvp_onboarding',
             NVP_ONBOARDING_PURPOSE: 'nvp_onboarding_purpose',
             NVP_TRYNEWDOT: 'nvp_tryNewDot',
+            NVP_GLOBAL_REIMBURSEMENT_BANK_ACCOUNT_SIGNER: 'nvp_globalReimbursementBankAccountSigner',
         },
 
         // Deprecated Onyx keys
@@ -1394,6 +1402,7 @@
             NVP_ONBOARDING: 'nvp_onboarding',
             NVP_ONBOARDING_PURPOSE: 'nvp_onboarding_purpose',
             NVP_TRYNEWDOT: 'nvp_tryNewDot',
+            NVP_GLOBAL_REIMBURSEMENT_BANK_ACCOUNT_SIGNER: 'nvp_globalReimbursementBankAccountSigner',
         },
 
         // Deprecated Onyx keys
@@ -1414,6 +1423,7 @@
             NVP_ONBOARDING: 'nvp_onboarding',
             NVP_ONBOARDING_PURPOSE: 'nvp_onboarding_purpose',
             NVP_TRYNEWDOT: 'nvp_tryNewDot',
+            NVP_GLOBAL_REIMBURSEMENT_BANK_ACCOUNT_SIGNER: 'nvp_globalReimbursementBankAccountSigner',
         },
 
         // Deprecated Onyx keys
@@ -1434,6 +1444,7 @@
             NVP_ONBOARDING: 'nvp_onboarding',
             NVP_ONBOARDING_PURPOSE: 'nvp_onboarding_purpose',
             NVP_TRYNEWDOT: 'nvp_tryNewDot',
+            NVP_GLOBAL_REIMBURSEMENT_BANK_ACCOUNT_SIGNER: 'nvp_globalReimbursementBankAccountSigner',
         },
 
         // Deprecated Onyx keys
@@ -1454,6 +1465,7 @@
             NVP_ONBOARDING: 'nvp_onboarding',
             NVP_ONBOARDING_PURPOSE: 'nvp_onboarding_purpose',
             NVP_TRYNEWDOT: 'nvp_tryNewDot',
+            NVP_GLOBAL_REIMBURSEMENT_BANK_ACCOUNT_SIGNER: 'nvp_globalReimbursementBankAccountSigner',
         },
 
         // Deprecated Onyx keys
@@ -1474,6 +1486,7 @@
             NVP_ONBOARDING: 'nvp_onboarding',
             NVP_ONBOARDING_PURPOSE: 'nvp_onboarding_purpose',
             NVP_TRYNEWDOT: 'nvp_tryNewDot',
+            NVP_GLOBAL_REIMBURSEMENT_BANK_ACCOUNT_SIGNER: 'nvp_globalReimbursementBankAccountSigner',
         },
 
         // Deprecated Onyx keys
@@ -1494,6 +1507,7 @@
             NVP_ONBOARDING: 'nvp_onboarding',
             NVP_ONBOARDING_PURPOSE: 'nvp_onboarding_purpose',
             NVP_TRYNEWDOT: 'nvp_tryNewDot',
+            NVP_GLOBAL_REIMBURSEMENT_BANK_ACCOUNT_SIGNER: 'nvp_globalReimbursementBankAccountSigner',
         },
 
         // Deprecated Onyx keys
@@ -1514,6 +1528,7 @@
             NVP_ONBOARDING: 'nvp_onboarding',
             NVP_ONBOARDING_PURPOSE: 'nvp_onboarding_purpose',
             NVP_TRYNEWDOT: 'nvp_tryNewDot',
+            NVP_GLOBAL_REIMBURSEMENT_BANK_ACCOUNT_SIGNER: 'nvp_globalReimbursementBankAccountSigner',
         },
 
         // Deprecated Onyx keys
@@ -1534,6 +1549,7 @@
             NVP_ONBOARDING: 'nvp_onboarding',
             NVP_ONBOARDING_PURPOSE: 'nvp_onboarding_purpose',
             NVP_TRYNEWDOT: 'nvp_tryNew