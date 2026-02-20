# Implementation Plan: Debug Dashboard Sites Layout & Navigation

## Phase 1: Research & Discovery (Locate Components & logic)
- [x] Task: Locate the `Sites` tab rendering logic in `factory/dashboard/athena.js`
- [x] Task: Identify the CSS/Tailwind classes currently causing the site cards to stretch across the screen
- [x] Task: Determine how the 'Live' tag is rendered and where the link URL is derived from
- [x] Task: Conductor - User Manual Verification 'Phase 1: Research & Discovery' (Protocol in workflow.md)

## Phase 2: Implement Responsive Grid Layout
- [x] Task: Update the site card container to use a responsive grid (e.g., `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`)
- [x] Task: Verify that site cards wrap into columns on wider screens
- [x] Task: Conductor - User Manual Verification 'Phase 2: Implement Responsive Grid Layout' (Protocol in workflow.md)
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Implement Responsive Grid Layout' (Protocol in workflow.md)

## Phase 3: Fix Live Link Navigation & Local Status
- [x] Task: Update the site list logic in `SiteController.js` to include `isInstalled` and `port` status
- [x] Task: Update the click handler for the 'Live' tag to correctly resolve the live URL and open it in a new tab
- [x] Task: Implement visual feedback for 'READY' (node_modules present) and clickable 'LOCAL' tags
- [x] Task: Display assigned port numbers on site cards for better developer overview
- [x] Task: Verify that clicking 'Live' opens the correct GitHub/live URL in a new browser tab
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Fix Live Link Navigation & Local Status' (Protocol in workflow.md)
