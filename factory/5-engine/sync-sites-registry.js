/**
 * @file sync-sites-registry.js
 * @description Scans all projects in sites/ and updates dock/public/sites.json with their current deployment status.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FACTORY_ROOT = path.resolve(__dirname, '../..');
const SITES_DIR = path.join(FACTORY_ROOT, 'sites');
const OUTPUT_FILE = path.join(FACTORY_ROOT, 'dock/public/sites.json');
const PORTS_FILE = path.join(FACTORY_ROOT, 'factory/config/site-ports.json');

async function syncRegistry() {
    console.log("🔍 Scanning sites for deployment status...");
    
    if (!fs.existsSync(SITES_DIR)) {
        console.error("❌ Sites directory not found.");
        return;
    }

    const projects = fs.readdirSync(SITES_DIR).filter(f => 
        fs.statSync(path.join(SITES_DIR, f)).isDirectory() && !f.startsWith('.')
    );

    // Load existing ports to maintain consistency
    let portMap = {};
    if (fs.existsSync(PORTS_FILE)) {
        try { portMap = JSON.parse(fs.readFileSync(PORTS_FILE, 'utf8')); } catch (e) {}
    }

    const registry = [];

    for (const project of projects) {
        const projectPath = path.join(SITES_DIR, project);
        const deployPath = path.join(projectPath, 'project-settings/deployment.json');
        const configPath = path.join(projectPath, 'athena-config.json');
        
        let deployData = {};
        let configData = {};
        
        if (fs.existsSync(deployPath)) {
            try { deployData = JSON.parse(fs.readFileSync(deployPath, 'utf8')); } catch (e) {}
        }
        
        if (fs.existsSync(configPath)) {
            try { configData = JSON.parse(fs.readFileSync(configPath, 'utf8')); } catch (e) {}
        }

        const port = portMap[project] || 5000;
        const localUrl = `http://localhost:${port}/${project}/`;

        registry.push({
            id: project,
            name: configData.projectName || project,
            siteType: configData.siteType || 'unknown',
            generatedAt: configData.generatedAt || null,
            governance_mode: configData.governance_mode || 'dev-mode',
            repoUrl: deployData.repoUrl || null,
            liveUrl: deployData.liveUrl || null,
            localUrl: localUrl,
            port: port,
            status: deployData.status || 'local'
        });
    }

    // Sort: live first, then alphabetical
    registry.sort((a, b) => {
        if (a.liveUrl && !b.liveUrl) return -1;
        if (!a.liveUrl && b.liveUrl) return 1;
        return a.id.localeCompare(b.id);
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(registry, null, 2));
    console.log(`✅ Registry updated with ${registry.length} sites. Saved to ${OUTPUT_FILE}`);
}

syncRegistry().catch(err => console.error(err));
