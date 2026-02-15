# Specification: Client Onboarding Protocol

## 🎯 Goal
Standardize and automate the process of bringing a new client into the Athena ecosystem. Transition from raw discovery to a provisioned `input/` folder and Google Sheet in minutes.

## 🧱 Components

### 1. The Discovery Agent (Interaction)
- **Logic**: A branching interview process that extracts business identity, goals, and visual preferences.
- **Output**: `input/<client-name>/discovery.json`.

### 2. Auto-Provisioning Engine (Automation)
- **Integration**: Wraps `auto-sheet-provisioner.js`, `create-repo.js`, and `site-wizard.js`.
- **Workflow**:
    - Create `input/<client-name>/`.
    - Provision Google Sheet from Template.
    - Setup GitHub Repository in the Organization.
    - Generate initial `site_config.json`.

### 3. Legacy Content Scraper (Efficiency)
- **Integration**: Uses `athena-scraper.js` to pull data from existing client sites.
- **AI Mapping**: Mapt scraped text to Google Sheet columns (Hero, About, Services).

### 4. Gemini CLI Skill (`skill-athena-onboarding`)
- **Instructions**: Guidelines for me (the AI) to lead the discovery interview and trigger the engine.
- **Tools**: Direct access to the new `onboarding-wizard.js`.

## 🛠️ Implementation Plan
1. [ ] Create `factory/docs/ONBOARDING_PROTOCOL.md` (Human-readable guide).
2. [ ] Develop `factory/5-engine/onboarding-wizard.js` (The orchestrator).
3. [ ] Define the `.gemini/skills/athena-onboarding.md` (The AI behavior).
4. [ ] Test with a "Mock Client" (e.g., "The Coffee House").
