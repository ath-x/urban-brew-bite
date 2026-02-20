# Implementation Plan: Debug Dashboard Sites Layout & Navigation

## Phase 1: Research & Discovery (Locate Components & logic)
- [ ] Task: Locate the `Sites` tab rendering logic in `factory/dashboard/athena.js`
- [ ] Task: Identify the CSS/Tailwind classes currently causing the site cards to stretch across the screen
- [ ] Task: Determine how the 'Live' tag is rendered and where the link URL is derived from
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Research & Discovery' (Protocol in workflow.md)

## Phase 2: Implement Responsive Grid Layout
- [ ] Task: Create a failing test for the layout logic (if applicable via DOM/Snapshots)
- [ ] Task: Update the site card container to use a responsive grid (e.g., `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`)
- [ ] Task: Verify that site cards wrap into columns on wider screens
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Implement Responsive Grid Layout' (Protocol in workflow.md)

## Phase 3: Fix Live Link Navigation
- [ ] Task: Create failing unit tests for the 'Live' link generation/click handler logic
- [ ] Task: Update the click handler for the 'Live' tag to correctly resolve the live URL and open it in a new tab
- [ ] Task: Verify that clicking 'Live' opens the correct GitHub/live URL in a new browser tab
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Fix Live Link Navigation' (Protocol in workflow.md)
