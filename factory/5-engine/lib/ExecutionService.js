/**
 * ExecutionService.js
 * @description Centralized service for running shell commands and external scripts.
 * Provides unified logging, error handling, and performance tracking.
 */

import { execSync, spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export class ExecutionService {
    constructor(configManager, logManager) {
        this.configManager = configManager;
        this.logManager = logManager;
        this.factoryDir = configManager.get('paths.factory');
    }

    /**
     * Run a command synchronously and capture its output
     */
    runSync(command, options = {}) {
        const { 
            cwd = this.factoryDir, 
            label = 'Task', 
            silent = false,
            env = process.env
        } = options;

        if (!silent) console.log(`[EXEC] Running ${label}: ${command}`);

        try {
            const output = execSync(command, {
                cwd,
                env: { ...process.env, ...env },
                encoding: 'utf8',
                stdio: ['ignore', 'pipe', 'pipe']
            });
            
            return { success: true, output: output.trim() };
        } catch (error) {
            const stderr = error.stderr ? error.stderr.toString() : error.message;
            console.error(`[EXEC] Error in ${label}:`, stderr);
            
            return { 
                success: false, 
                error: stderr,
                exitCode: error.status || 1
            };
        }
    }

    /**
     * Run a command asynchronously (spawn) and return a promise
     */
    async runAsync(command, args = [], options = {}) {
        const { 
            cwd = this.factoryDir, 
            label = 'Task',
            env = process.env,
            onOutput = null
        } = options;

        console.log(`[EXEC] Starting Async ${label}: ${command} ${args.join(' ')}`);

        return new Promise((resolve, reject) => {
            const child = spawn(command, args, {
                cwd,
                env: { ...process.env, ...env },
                stdio: onOutput ? ['ignore', 'pipe', 'pipe'] : 'inherit'
            });

            if (onOutput) {
                child.stdout.on('data', (data) => onOutput(data.toString(), 'stdout'));
                child.stderr.on('data', (data) => onOutput(data.toString(), 'stderr'));
            }

            child.on('close', (code) => {
                if (code === 0) {
                    resolve({ success: true, exitCode: 0 });
                } else {
                    resolve({ success: false, exitCode: code, error: `Process exited with code ${code}` });
                }
            });

            child.on('error', (err) => {
                console.error(`[EXEC] Spawn Error in ${label}:`, err.message);
                reject(err);
            });
        });
    }

    /**
     * Special helper for running Node.js scripts within the factory
     */
    runEngineScript(scriptName, args = [], options = {}) {
        const scriptPath = path.join(this.factoryDir, '5-engine', scriptName);
        const command = `"${process.execPath}" "${scriptPath}" ${args.map(a => `"${a}"`).join(' ')}`;
        return this.runSync(command, { label: scriptName, ...options });
    }
}
