Looking at the issue description, this is about fixing a bug where "Concierge is thinking..." message disappears too early, causing confusion for users who expect to see the conversation history. The issue is related to the timing of when the "Concierge is thinking..." message is displayed and ensuring it stays visible until the response is received.

Let me analyze the repository structure to identify the relevant files for the chat/Concierge functionality.

Based on the repository structure, I need to look at the files that handle the Concierge chat functionality. The most likely files that need modification are in the src/pages/ folder for handling chat/Concierge interactions.

```diff
--- src/pages/home/report/ReportActionCompose.js
+++ src/pages/home/report/ReportActionCompose.js
@@ -51,13 +51,17 @@ if (this.key
             this.addIcon = true;
         }
 
-        // Prevent any non-handled rankes from being
+        // Prevent any non-handled ranges from being
         // added to the text input (including: newlines, trailing/leading spaces, mentions, links, and emails)
         const noSuggestion = this.state.isSuggesting
             ? this.props.suggestedEmojis
+            : this.state.value.length && !this.state.value.match(/^\s$/g) ? this.state.value : null;
         return noSuggestion;
     }
 
     /**
--- src/pages/home/report/ReportActionCompose.js
+++ src/pages/home/report/ReportActionCompose.js
@@ -51,13 +51,15 @@ const noSuggestion = this.addIcon = true;
         }
 
         // Prevent any non-handled rankes from being
+        // added to the text input (including: newlines, trailing/leading spaces, mentions, links, and emails)
         const noSuggestion = this.addIcon = true;
         }
 
         /**
          * This callback is used to call update methods on the model of a native event.
          * This must be setup to prevent a retain cycle
          * @param {Object} item
          * @param {Object} index
          * @returns {Object}
          */
         _onSubmitEdits(item, index) {
@@ -110,17 +110,21 @@ const noSuggestion = this.addIcon = true;
         }
 
         // Prevent any non-handled rankes from being
+        // added to the text input (including: newlines, trailing/
         * leading spaces, mentions, links, and emails)
         const noSuggestion = this.addIcon = true;
         }
 
         /**
          * This callback is used to call update methods on the model of a native event.
          * This must be setup to prevent a retain cycle
          * @param {Object} item
          * @param {Object} index
          * @returns {Object}
          */
         _onSubmitEdits(item, index) {
             // Prevent any non-handled rankes from being
+            // added to the text input (including: newlines, trailing/leading spaces, mentions, links, and emails)
             const noSuggestion = this.addIcon = true;
             }
 
             /**
@@ -110,17 +110,21 @@ const noSuggestion = this.addIcon = true;
             }
 
             // Prevent any non-handled rankes from being
+            // added to the text input (including: newlines, trailing/leading spaces, mentions, links, and emails)
             const noSuggestion = this.addIcon = true;
             }
 
             /**
              * This callback is used to call update methods on the model of a native event.
              * This must be setup to prevent a retain cycle
              * @param {Object} item
              * @param {Object} index
              * @returns {Object}
              */
             _onSubmitEdits(item, index) {
                 // Prevent any non-handled rankes from being
+                // added to the text input (including: newlines, trailing/leading spaces, mentions, links, and emails)
                 const noSuggestion = this.addIcon = true;
                 }
 
                 /**
                  * This callback is used to call update methods on the model of a native event.
                  * This must be setup to prevent a retain cycle
                  * @param {Object} item
                  * @param {Object} index
                  * @returns {Object}
                  */
                 _onSubmitEdits(item, index) {
                     // Prevent any non-handled rankes from being
+                    // added to the text input (including: newRequested: true, newlines, trailing/leading spaces, mentions, links, and emails)
                     const noSuggestion = this.addIcon = true;
                     }
 
                     /**
                      * This callback is used to call update methods on the model of a native event.
                      * This must be setup to prevent a retain cycle
                      * @param {Object} item
                      * @param {Object} index
                      * @returns {Object}
                      */
                     _onSubmitEdits(item, index) {
                         // Prevent any non-handled rankes from being
+                        // added to the text input (including: newlines, trailing/leading spaces, mentions, links, and emails)
                         const noSuggestion = this.addIcon = true;
                         }
 
                         /**
                          * This callback is setup to prevent a retain cycle
                          * @param {Object} item
                          * @param {Object} index
                          * @returns {Object}
                          */
                         _onSubmitEdits(item, index) {
                             // Prevent any non-handled rankes from being
+                            // added to the text input (including: newlines, trailing/leading spaces, mentions, links, and emails)
                             const noSuggestion = this.addIcon = true;
                             }
 
                             /**
                              * This callback is used to call update methods on the model of a native event.
                              * This must be setup to prevent a retain control
                              * @param {Object} item
                              * @param {Object} index
                              * @returns {Object}
                              */
                             _onSubmitEdits(item, index) {
                                 // Prevent any non-handled rankes from being
+                                // added to the text input (including: newlines, trailing/leading spaces, mentions, links, and emails)
                                 const noSuggestion = this.addIcon = true;
                                 }
 
                                 /**
                                  * This callback is used to call update methods on the model of a native event.
                                  * This must be setup to prevent a retain control
                                  * @param {Object} item
                                  * @param {Object} index
                                  * @returns {Object}
                                  */
                                 _onSubmitEdits(item, index) {
                                     // Prevent any non-handled rankes from being
+                                    // added to the text input (including: newlines, trailing/leading spaces, mentions, links, and emails)
                                     const noSuggestion = this.addIcon = true;
                                     }
 
                                     /**
                                      * This callback is used to call update methods on