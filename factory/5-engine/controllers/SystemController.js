/**
 * SystemController.js
 * @description Manages system-wide operations: logs, settings, secrets, and status.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

export class SystemController {
    constructor(configManager, logManager, secretManager, executionService) {
        this.configManager = configManager;
        this.logManager = logManager;
        this.secretManager = secretManager;
        this.execService = executionService;
        this.root = configManager.get('paths.root');
    }

    /**
     * Get system configuration
     */
    getConfig() {
        return this.configManager.getAll();
    }

    /**
     * Get log status
     */
    getLogsStatus() {
        return this.logManager.getStatus();
    }

    /**
     * Rotate logs (cleanup)
     */
    async rotateLogs() {
        return await this.logManager.rotate();
    }

    /**
     * Clear all logs
     */
    clearLogs() {
        return this.logManager.clearAll();
    }

    /**
     * Sync secrets to GitHub
     */
    async syncSecrets() {
        const { GITHUB_USER, GITHUB_ORG } = process.env;
        const repoName = path.basename(path.resolve(this.root)); 
        const owner = GITHUB_ORG || GITHUB_USER;
        const fullRepo = `${owner}/${repoName}`;

        console.log(`[SYSTEM] Start sync voor repo: ${fullRepo}`);
        const logs = await this.secretManager.syncSecrets(fullRepo);
        return { success: true, logs };
    }

    /**
     * Get disk usage status
     */
    getSystemStatus() {
        const res = this.execService.runSync('df -h /', { label: 'Disk Usage' });
        if (!res.success) throw new Error(`Kon systeemstatus niet ophalen: ${res.error}`);
        
        const lines = res.output.split('\n');
        const stats = lines[1].split(/\s+/);
        return { size: stats[1], used: stats[2], avail: stats[3], percent: stats[4] };
    }

    /**
     * Get service account config
     */
    getSAConfig() {
        let saPath = path.join(this.root, 'factory', 'sheet-service-account.json');
        if (!fs.existsSync(saPath)) saPath = path.join(this.root, 'factory', 'service-account.json');
        
        let email = 'athena-cms-sheet-write@gen-lang-client-0519605634.iam.gserviceaccount.com';
        if (fs.existsSync(saPath)) {
            try {
                const saData = JSON.parse(fs.readFileSync(saPath, 'utf8'));
                if (saData.client_email) email = saData.client_email;
            } catch (e) { }
        }
        return { serviceAccountEmail: email };
    }

    /**
     * Get environment settings
     */
    getSettings() {
        const envPath = path.join(this.root, 'factory', '.env');
        const settings = {};
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf8');
            content.split('\n').forEach(line => {
                const [key, ...value] = line.split('=');
                if (key && !key.startsWith('#')) {
                    settings[key.trim()] = value.join('=').trim();
                }
            });
        }
        return settings;
    }

    /**
     * Update environment settings
     */
    updateSettings(newSettings) {
        const envPath = path.join(this.root, 'factory', '.env');
        let envContent = '';

        if (fs.existsSync(envPath)) {
            envContent = fs.readFileSync(envPath, 'utf8');
        }

        let lines = envContent.split('\n');

        for (const [key, value] of Object.entries(newSettings)) {
            let found = false;
            lines = lines.map(line => {
                if (line.trim().startsWith(`${key}=`)) {
                    found = true;
                    return `${key}=${value}`;
                }
                return line;
            });

            if (!found && key.trim() !== '') {
                lines.push(`${key}=${value}`);
            }
        }

        fs.writeFileSync(envPath, lines.join('\n'));
        
        // Update process.env for current session
        Object.assign(process.env, newSettings);

        return { success: true, message: 'Instellingen succesvol bijgewerkt in .env' };
    }
}
