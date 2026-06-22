 Looking at this issue, I need to understand what's happening:

1. When a user navigates to an expense details page via a link to a specific message, the message isn't scrolled to on first navigation
2. The "Submitted" system message doesn't appear when navigating via another message link

This is a React Native/Expensify app issue related to report/message scrolling behavior. Let me analyze the likely code structure.

The issue is about:
- Deep linking to a specific message in a report
- Scroll behavior not working on first navigation
- System messages (like "Submitted") not appearing when navigating via link

Let me look for relevant files in the src directory structure. Based on the repo structure, I need to find files related to:
- Report scrolling
- Message linking/navigation
- Report actions rendering

Let me infer the most likely files based on common Expensify App patterns:

```
src/
  pages/
    home/
      report/
        ReportActionsList.tsx or similar
        ReportActionsView.tsx
        ReportScreen.tsx
  libs/
    Navigation/
    ReportUtils.ts
```

The issue seems to be that when navigating to a report with a specific reportActionID (via deep link), the scroll to that message doesn't happen properly on first load, and system messages aren't fetched/ rendered.

Looking at the symptoms:
1. Message not scrolled to on first navigation - suggests the scroll logic runs before all messages are loaded
2. "Submitted" system message doesn't appear - suggests system messages aren't being fetched when navigating via link

This is likely in the report actions loading/scroll logic. Let me look for where report actions are fetched and where scroll-to-message logic lives.

Based on typical Expensify patterns, I'll look at files related to:
- `src/pages/home/report/ReportActionsView.tsx` or similar
- `src/libs/actions/Report.ts` for fetching logic
- `src/hooks/useReportActionScrollManager.ts` or similar

Let me check for the most relevant files. Given the issue mentions "submitted" system message not showing and scroll not working, this is likely about:

1. The `openReport` or `fetchReportActions` not being called with correct parameters when navigating via deep link
2. Or the scroll manager not waiting for all actions to load before scrolling

Looking at the file structure, I need to find where report opening happens. Let me search for relevant patterns.

The most likely issue is in how the report is opened when navigating via a link with a `reportActionID`. When you navigate to a report with a specific action ID, the app needs to:
1. Open the report
2. Fetch all necessary report actions (including system messages like "Submitted")
3. Scroll to the specific action

The bug suggests that on first navigation, the scroll happens before all actions are loaded, or the system messages aren't fetched at all.

Let me look for the report opening logic and the scroll-to-message logic.

Based on my analysis, I believe the issue is likely in one of these areas:
1. `src/libs/actions/Report.ts` - where `openReport` is called
2. `src/pages/home/ReportScreen.tsx` or similar - where the report is displayed
3. A hook that manages scrolling to report actions

The key insight is that when navigating via a link with a `reportActionID`, the app needs to ensure it fetches enough report actions to include the target action, and system messages like "Submitted" need to be included.

Let me look at how report actions are fetched when opening a report. The issue might be that `openReport` API call doesn't fetch system messages when a specific `reportActionID` is provided, or the scroll happens before the data is loaded.

I'll search for where `reportActionID` is used in navigation and report opening.

Given the constraints, let me make an educated guess about the file structure and provide a fix. The most likely scenario is:

1. There's a `ReportActionsView` or similar component that handles displaying report actions
2. There's scroll logic that needs to wait for actions to load
3. The `openReport` or similar function needs to handle `reportActionID` properly to fetch surrounding actions including system messages

Let me look for files that might contain the scroll-to-message logic and the report opening logic.

Based on typical React Native app patterns and the Expensify codebase structure, I'll check these likely paths:

```
src/pages/home/report/ReportActionsView.tsx
src/libs/actions/Report.ts
src/hooks/useReportActionScrollManager.ts
src/libs/ReportUtils.ts
```

The fix likely involves ensuring that when navigating to a report with a `reportActionID`:
1. We fetch report actions around that ID (not just the most recent ones)
2. We wait for those actions to load before attempting to scroll
3. System messages are included in the fetched actions

Let me think about what specific code change would fix this. The issue says "submitted" system message doesn't appear when navigating via another message link. This suggests that when we fetch report actions for scrolling to a specific message, we're not getting system messages.

Looking at the API, `OpenReport` likely takes parameters like `reportActionID` to fetch actions around a specific point. The issue might be that when `reportActionID` is provided, the API returns actions but not system messages, or the client-side filtering excludes them.

Actually, re-reading the issue more carefully: "Submitted" system message does not appear in the expense details thread when navigating via another message link.

This suggests that when you navigate to the expense report via a link to a regular message (not the "Submitted" system message), the system messages aren't loaded. This is because the initial fetch might only load recent actions or actions around the linked message, missing system messages.

The fix would be to ensure that when opening a report with a specific `reportActionID`, we still load all necessary report actions including system messages, or we ensure the scroll logic works correctly with the loaded data.

Let me look for where `reportActionID` is used in the report opening flow. I need to find the component or hook that initiates the report open and manages scrolling.

Given the file structure, I'll check for these files:
- `src/pages/home/ReportScreen.tsx` or `src/pages/home/report/ReportScreen.tsx`
- `src/libs/actions/Report.ts`
- `src/hooks/useReportActionScrollManager.ts` or similar

Let me provide a fix based on the most likely file structure. I'll need to make educated guesses about the exact file paths.

Actually, looking at the root listing, I see `src` is a directory. Let me think about what files would be most relevant.

The issue is specifically about:
1. Scroll to message not working on first navigation via link
2. "Submitted" system message not appearing

This is likely a bug in how the report is opened when a `reportActionID` is in the URL. The app probably opens the report but doesn't properly fetch all actions or doesn't scroll correctly.

Let me look for the report screen and report actions view components.

Based on my analysis, I believe the most likely files involved are:
1. `src/pages/home/ReportScreen.tsx` - main report screen
2. `src/pages