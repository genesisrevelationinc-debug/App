 Looking at this issue, I need to understand what's happening:

1. In Chrome on macOS, when clicking "Download codes" in the 2FA setup flow
2. A save confirmation modal appears (the native browser save dialog)
3. After saving, the 2FA page closes instead of navigating to the QR code page

This is likely a focus/blur event issue. When the download dialog opens, the window loses focus, and when it regains focus, something is triggering a close action. This is a common issue with React Navigation or modal/dropdown components that close on outside click or blur events.

Let me search for relevant files related to 2FA and the download codes functionality.

Based on the repo structure, I need to find the 2FA related files. Let me infer the likely paths:

- `src/pages/settings/Security/TwoFactorAuth/` or similar
- The download codes functionality

Looking at common patterns in this codebase, the issue is likely related to:
1. A `useFocusEffect` or `useEffect` that closes the page when focus is lost/regained
2. A `react-native-web` or navigation issue where blur/focus events cause the page to close
3. The download action causing a navigation event

Let me look for the TwoFactorAuth files. Based on the structure, it would likely be in `src/pages/settings/Security/TwoFactorAuth/` or `src/pages/TwoFactorAuth/`.

The most likely cause is that when the browser's native save dialog opens, the window loses focus, and there's a `window.blur` or `visibilitychange` handler that incorrectly triggers a close/navigation action. Or, more commonly, this could be related to a `beforeunload` handler or a focus trap in a modal.

Actually, looking more carefully at the issue - this is specifically about the 2FA page closing when downloading codes. The download likely triggers a file download which causes a brief blur/focus cycle. In React Native Web / React Navigation, this can cause issues with focus-based navigation.

A common fix for this type of issue is to prevent the default behavior or to use a timeout/delay for focus-based actions, or to use `document.visibilityState` instead of just focus/blur.

Let me search for the relevant code. The file is likely at:
- `src/pages/settings/Security/TwoFactorAuth/` 

Given the repo structure and the nature of the bug, I'll look for files related to TwoFactorAuth. Let me check what files might exist:

Based on typical Expensify App structure:
- `src/pages/settings/Security/TwoFactorAuth/TwoFactorAuthPage.tsx` or similar
- `src/pages/settings/Security/TwoFactorAuth/CopyCodesPage.tsx` or similar

The issue mentions "Download codes" which suggests there's a button that downloads recovery codes. The bug is that after the save dialog, the page closes.

Looking at this more carefully - the issue is likely in how the navigation is handled. When the file download happens, it might trigger a `pop` or `goBack` action incorrectly.

Let me think about what could cause this in a React Navigation context:
1. A `useFocusEffect` that cleans up and navigates away
2. A `beforeunload` handler
3. A focus/blur handler on the window

Actually, the most common cause of this specific bug pattern (page closes after file download in Chrome) is related to how `react-native-web` or the navigation library handles the `blur` event when the browser's native dialog opens. When the save dialog appears, the window loses focus, and when it returns, a `focus` event fires. If there's code that treats this as a "click outside" or "escape" action, it could close the modal/page.

However, looking at the specific behavior - "the 2FA page closes" - this sounds like the entire page is being navigated away from, not just a modal closing. This could be due to:

1. The download link having `target="_blank"` or similar that causes navigation
2. A `beforeunload` event handler
3. The download being triggered by a form submission that navigates

Actually, I think I found the likely issue. In many web apps, file downloads are triggered by creating an `<a>` element with `download` attribute and clicking it programmatically. If this is done incorrectly, it can cause navigation.

But wait - the issue says "the 2FA page closes instead of navigating to the QR code page." This suggests the expected flow is:
1. Download codes
2. Navigate to QR code page

But instead, the page just closes/goes back.

This is likely a React Navigation issue where the `goBack` or `navigate` action is being triggered incorrectly.

Let me look for the actual file. I'll search for TwoFactorAuth related files.

Given the structure, I believe the relevant files would be in:
- `src/pages/settings/Security/TwoFactorAuth/`

Let me check if there's a specific file for the codes page or download functionality.

Since I need to produce a diff, let me think about what the most likely fix would be based on common patterns:

The issue is specifically on Chrome/macOS and happens when there's a save confirmation modal. This strongly suggests it's related to the `window.onblur` or `window.onfocus` events, or the `document.visibilitychange` event.

In many React Native Web apps, there's a `useWindowDimensions` or similar hook that might re-render on focus change. Or there could be a `useFocusEffect` that has a cleanup function.

Actually, I think the most likely cause is in the navigation library or in a custom hook that listens for `focus`/`blur` events. When the save dialog opens, the window blurs, and when it closes, the window focuses. If there's code that treats a focus event as a signal to refresh or re-check state, it could cause issues.

But let me think more specifically. The 2FA page "closes" - this means the user is taken back to the previous screen. In React Navigation, this would be a `goBack()` or `pop()` action.

One very common cause of this bug: if the download is triggered by a `<button>` inside a `<form>`, and the form submits, causing a page reload/navigation. But this would happen on all browsers.

Another common cause: if the download is triggered by creating an `<a>` element and clicking it, and the `<a>` element doesn't have the right attributes, it could navigate.

Actually, I just realized - the issue says "Repro when there is save confirmation modal that appears". This is the browser's native save dialog. On macOS Chrome, when you download a file, if you have "Ask where to save each file before downloading" enabled, a save dialog appears. This dialog causes the window to lose focus.

Now, in React Navigation v6+, there's a `useFocusEffect` hook that runs when a screen comes into focus. But more importantly, there's the `useIsFocused` hook.

I think the issue might be related to how the app handles the `beforeunload` event, or how it handles the case where the user leaves and comes back.

Wait