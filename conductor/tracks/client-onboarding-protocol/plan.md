# Implementation Plan: Client Onboarding Protocol

## Phase 1: Documentation & Design
- [x] Draft `factory/docs/ONBOARDING_PROTOCOL.md`.
- [x] Define the JSON schema for `discovery.json` (v2.0).

## Phase 2: Core Orchestrator
- [x] Build `factory/5-engine/onboarding-wizard.js`.
- [x] Integrate with `auto-sheet-provisioner.js` and `athena-scraper.js`.
- [x] Dashboard API Integration (`/api/onboard`).

## Phase 3: AI Skill Integration
- [x] Create `factory/SKILLS/onboarding-agent-skill.md`.
- [ ] Test interactive interview flow (Scheduled for next week).

## Phase 4: Scraper Integration
- [x] Add "Import from URL" capability to the onboarding wizard.
- [ ] Auto-populate Google Sheet via AI mapping (Future enhancement).

## Phase 5: Validation
- [ ] Execute first live "Digital Strategist" onboarding session.
