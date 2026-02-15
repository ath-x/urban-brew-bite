# Athena CMS: System-Wide Quality Audit Report

## Summary
The system is currently in a hybrid state. Modern architectural patterns (Controllers, ConfigManager) have been introduced but are not yet fully enforced. Legacy patterns (direct shell execution, hardcoded paths, direct process.env access) persist in core modules.

## Critical Findings

### 1. Logic Duplication & Leakage
The Dashboard API (`factory/dashboard/athena.js`) acts as a logic holder rather than a thin gateway.
- **Problem**: Business logic for variants, installations, and scraper execution is hardcoded in the Express routes.
- **Risk**: Difficult to test, impossible to reuse in CLI without duplication.

### 2. Execution Fragility
Kritieke processen (TSV sync, site generation) gebruiken `execSync` zonder robuuste try-catch wrappers.
- **Problem**: Failures in sub-scripts often go unnoticed by the parent process.
- **Risk**: Data corruption or incomplete site builds.

### 3. Configuration Inconsistency
The `AthenaConfigManager` is bypassed in several locations.
- **Problem**: Direct `process.env` access and hardcoded relative paths (e.g., `../../sites`) are common.
- **Risk**: Path errors when running from different directories; difficult migration to different environments.

### 4. Naming Drift
There is no enforced naming convention for projects and sites.
- **Problem**: Logic must account for both `[id]` and `[id]-site`.
- **Risk**: Brittle logic and confusing directory structures.

## Action Plan

### Phase 1: Controller Purification
- Move all business logic from `factory/dashboard/athena.js` to the Controller layer.
- Create a `SystemController` for logs, settings, and maintenance.
- Create a `ToolController` for scraper and variant generation.

### Phase 2: Unified Execution Service
- Implement `ExecutionService.js` to wrap all shell commands.
- Standardize logging and error recovery.

### Phase 3: Path & Config Standardisation
- Enforce `AthenaConfigManager` project-wide.
- Eliminate all `../../` hardcoded path jumps.
