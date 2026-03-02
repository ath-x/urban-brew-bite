import fs from 'fs';
import path from 'path';

const LOG_FILE = 'conductor/execution_log.md';
const role = process.argv[2]; // 'lead' or 'agent'
const id = process.argv[3];   // Agent ID (only needed for role='agent')

if (!role || (role === 'agent' && !id)) {
  console.error('❌ Usage: node conductor/pulse.js [lead | agent] [AgentID]');
  process.exit(1);
}

const targetTag = (role === 'lead') ? '[PING]' : `[DIRECTIVE] Agent (${id})`;
const globalTag = '[DIRECTIVE] ALL AGENTS';

console.log(`📡 [Pulse] Initialized as ${role.toUpperCase()}${id ? ` (${id})` : ''}.`);
console.log(`📡 [Pulse] Monitoring '${LOG_FILE}' for: ${targetTag}${role === 'agent' ? ` and ${globalTag}` : ''}`);

let lastSize = fs.statSync(LOG_FILE).size;

fs.watch(LOG_FILE, (eventType) => {
  if (eventType === 'change') {
    const stats = fs.statSync(LOG_FILE);
    const newSize = stats.size;

    if (newSize > lastSize) {
      const stream = fs.createReadStream(LOG_FILE, { start: lastSize, end: newSize });
      stream.on('data', (chunk) => {
        const lines = chunk.toString().split('
');
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.includes(targetTag) || (role === 'agent' && trimmed.includes(globalTag))) {
            console.log(`
🔔 [PULSE DETECTED]: ${trimmed}`);
            console.log('👉 Action Required: Synchronize now.');
            // Exit 0 to signal the parent process to wake up
            process.exit(0);
          }
        }
      });
      lastSize = newSize;
    }
  }
});
