import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const ML_SERVICE_DIR = path.join(PROJECT_ROOT, 'ml_service');
const PREDICT_SCRIPT = path.join(ML_SERVICE_DIR, 'predict.py');

// Common python locations on Windows
const PYTHON_CANDIDATES = [
  'python',
  'python3',
  'C:\\Users\\Darshan S D\\AppData\\Local\\Programs\\Python\\Python314\\python.exe',
  'C:\\Users\\Darshan S D\\AppData\\Local\\Programs\\Python\\Python313\\python.exe',
  'C:\\Python314\\python.exe',
  'C:\\Python313\\python.exe'
];

let cachedPythonPath = null;

const getPythonExecutable = () => {
  if (cachedPythonPath) return cachedPythonPath;
  for (const p of PYTHON_CANDIDATES) {
    if (p.includes('\\') && fs.existsSync(p)) {
      cachedPythonPath = p;
      return p;
    }
  }
  cachedPythonPath = 'python';
  return 'python';
};

/**
 * Execute Python predict.py via child_process
 */
export const runPythonPredict = (task, payload = {}, imagePath = null) => {
  return new Promise((resolve, reject) => {
    const pythonBin = getPythonExecutable();
    const args = [PREDICT_SCRIPT, '--task', task];

    if (imagePath) {
      args.push('--image', imagePath);
    } else {
      args.push('--stdin');
    }

    const pyProcess = spawn(pythonBin, args, {
      cwd: ML_SERVICE_DIR,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    pyProcess.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    pyProcess.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    pyProcess.on('close', (code) => {
      if (code === 0 && stdout.trim()) {
        try {
          // Find last valid JSON in stdout
          const lines = stdout.trim().split('\n');
          for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i].trim();
            if (line.startsWith('{') && line.endsWith('}')) {
              return resolve(JSON.parse(line));
            }
          }
          return resolve(JSON.parse(stdout.trim()));
        } catch (parseErr) {
          return reject(new Error(`Failed to parse Python ML output: ${stdout}`));
        }
      } else {
        return reject(new Error(`Python ML process exited with code ${code}. Stderr: ${stderr}`));
      }
    });

    pyProcess.on('error', (err) => {
      reject(err);
    });

    // Write input payload to stdin if not image
    if (!imagePath) {
      pyProcess.stdin.write(JSON.stringify(payload));
      pyProcess.stdin.end();
    }
  });
};

/**
 * Call ML Service via HTTP (Port 5001) with automatic CLI fallback
 */
export const callMlService = async (task, payload = {}, imagePath = null) => {
  const FLASK_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:5001';

  // 1. Try fast HTTP Microservice
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1800);

    let endpoint = `/api/predict/${task.replace('_', '-')}`;
    let res;

    if (imagePath) {
      res = await fetch(`${FLASK_URL}/api/predict/disease`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_path: imagePath }),
        signal: controller.signal
      });
    } else {
      res = await fetch(`${FLASK_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
    }

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return { ...data, engine: 'Python Flask Microservice (In-Memory RAM)' };
    }
  } catch (httpErr) {
    // Microservice offline, fall through to CLI runner
  }

  // 2. Direct Python CLI execution fallback
  try {
    const cliResult = await runPythonPredict(task, payload, imagePath);
    return { ...cliResult, engine: 'Python CLI Direct Engine' };
  } catch (cliErr) {
    console.warn(`[AIBridge] Python execution error: ${cliErr.message}`);
    throw cliErr;
  }
};

