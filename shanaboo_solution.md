Looking at this issue, the problem is that the card name field shows an error "Name can only include letters" when it should allow numbers as well. This is a validation issue on the card name field.

Let me search for the relevant validation logic in the codebase. Based on the issue description, this is related to adding a payment card where the cardholder name field incorrectly restricts input to only letters.

I need to find where the card name validation is defined. Let me look for the relevant files:

1. The validation message "Name can only include letters"
2. The card form component

Let me search for these patterns in the codebase.</think>

