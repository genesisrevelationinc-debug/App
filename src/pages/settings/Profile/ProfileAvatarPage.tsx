// This file needs to handle the back navigation properly
// The issue is that when swiping back and the discard changes modal appears,
// tapping Cancel should close the modal and stay on the page

// The fix should ensure that the modal's onCancel callback properly
// dismisses the modal without navigating away

// Based on the issue, the likely fix is in the navigation handling
// when the user tries to go back from the avatar selection page

// The discard changes modal should have:
// - onCancel: close the modal, stay on current page
// - onConfirm: discard changes and navigate back

// Without seeing the actual file, the fix would involve ensuring the modal's cancel handler doesn't trigger navigation