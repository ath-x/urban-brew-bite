# Specification: Debug Dashboard Sites Layout & Navigation

## Overview
This track focuses on fixing layout issues and broken navigation in the Athena Dashboard's **Sites** tab. Specifically, it addresses the non-responsive stretching of site cards and the non-functional "Live" navigation links.

## User Persona
- **Developer/Admin:** Managing and viewing multiple sites within the Athena Factory ecosystem.

## Functional Requirements
1.  **Responsive Grid Layout:**
    -   Modify the site cards' layout to use a grid system (e.g., CSS Grid or Flexbox with wrapping) instead of stretching across the full screen width when space is available.
2.  **Live Deployment Navigation:**
    -   Implement/fix the click handler for the 'Live' tag on each site card.
    -   Ensure clicking the 'Live' tag opens the corresponding live deployment URL (e.g., GitHub Pages) in a new browser tab.

## Acceptance Criteria
- [ ] Site cards are displayed in multiple columns on wide screens.
- [ ] Clicking the 'Live' tag on any site card successfully opens the correct live URL in a new tab.

## Out of Scope
- General design overhaul of the entire dashboard.
- Adding new functionality (like site creation) in this specific track.
