# Implementation Plan: Web-Based Discovery Agent (Completed)

This track implements the "Digital Strategist" interview directly in the web dashboard and makes technical onboarding flexible for startups.

## Phase 1: Flexible Provisioning (Completed)
- [x] Update `factory/5-engine/onboarding-wizard.js` to handle missing website URLs (skip scraper) and missing client emails (defer sharing).
- [x] Update `/api/onboard` endpoint in `athena.js` to support these optional fields.

## Phase 2: Web Chat Interface (Completed)
- [x] Overhaul `onboarding-modal` in `index.html` with a tabbed interface: "Technical Setup" and "Strategy Chat".
- [x] Implement a real-time chat UI (message history, input field) within the modal.
- [x] Add CSS for the chat bubbles and scrolling in `extra-tabs.css`.

## Phase 3: AI Strategist Logic (Completed)
- [x] Create `/api/onboard/chat` endpoint in `athena.js`.
- [x] Implement the AI chat loop in `athena.js` using Gemini 3.0.
- [x] System prompt for the Strategist: focus on extraction of business goals, audience, and required data tables.

## Phase 4: Data Handover (Completed)
- [x] Implement "Finalize Interview" action that generates a `discovery.json` report in the data source folder.
- [x] Add a "Use Discovery Report" button in the SiteType Wizard to auto-populate the business description.

## Phase 5: Verification (Ready)
- [ ] Test onboarding a client with zero initial data (no URL, no email).
- [ ] Perform a full strategy interview via the web dashboard.
- [ ] Verify that `discovery.json` is correctly generated.
