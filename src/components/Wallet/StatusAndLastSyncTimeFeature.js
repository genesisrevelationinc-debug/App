   // Original bank account statuses
   verified: {status: 'verified', translationKey: 'Verified', newStatus: 'Active', tooltip: null},
   setup: {status: 'setup', translationKey: 'Setup', newStatus: 'Incomplete', tooltip: 'Finish adding bank account', button: 'Finish'},
   pending: {status: 'pending', translationKey: 'Pending', newStatus: 'Pending', tooltip: 'Please confirm test transactions', button: 'Confirm'},
   verifing: {status: 'verifying', translationKey: 'Verifying', tooltip: 'We\'re reviewing your documentation', button: null},
   locked: {status: 'locked', translationKey: 'Locked', newStatus: 'Locked', tooltip: 'This account requires attention', button: 'Unlock'},
   active: {status: 'active', translationKey: 'Active', newStatus: 'Active', button: null},
   inactive: {status: 'inactive', translationKey: 'Inactive', newStatus: 'Inactive', tooltip: 'Please fix this connection', button: 'Fix'}
   // Map old status to new status based on the requirements
   const statusMapping = {
       'verified': 'active',
       'setup': 'incomplete',
       'pending': 'pending',
       'verifying': 'verifying',
       'locked': 'locked'
   };
   
   // Keep the existing status names for the UI mapping
   return statusMapping[currentStatus] || currentStatus;
   bankAccountStatuses,
   updateBankAccountStatus