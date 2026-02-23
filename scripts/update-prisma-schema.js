#!/usr/bin/env node

/**
 * Fetches the latest version of @InRealArt/prisma-schema from the registry,
 * updates package.json if needed, then runs install + prisma:copy-schema + prisma generate.
 */

const { execFileSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const PKG_NAME = '@InRealArt/prisma-schema'
const PKG_JSON_PATH = path.resolve(__dirname, '../package.json')
const ROOT_DIR = path.resolve(__dirname, '..')

// Load .env to get GITHUB_TOKEN (needed for private GitHub Packages registry)
const envPath = path.join(ROOT_DIR, '.env')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (!(key in process.env)) process.env[key] = val
  }
}

function run(bin, args) {
  console.log(`\n> ${bin} ${args.join(' ')}`)
  execFileSync(bin, args, { stdio: 'inherit', cwd: ROOT_DIR, env: process.env })
}

function capture(bin, args) {
  return execFileSync(bin, args, { cwd: ROOT_DIR, env: process.env }).toString().trim()
}

// 1. Fetch latest version from registry (auth via GITHUB_TOKEN loaded from .env)
let latestVersion
try {
  latestVersion = capture('pnpm', ['view', PKG_NAME, 'version', '--json']).replace(/"/g, '')
} catch {
  latestVersion = capture('npm', ['view', PKG_NAME, 'version'])
}

console.log(`Latest version of ${PKG_NAME}: ${latestVersion}`)

// 2. Read current package.json
const pkg = JSON.parse(fs.readFileSync(PKG_JSON_PATH, 'utf8'))
const currentSpec = (pkg.devDependencies || {})[PKG_NAME] || (pkg.dependencies || {})[PKG_NAME]
const currentVersion = currentSpec ? currentSpec.replace(/^[\^~]/, '') : null

if (currentVersion === latestVersion) {
  console.log(`Already up to date (${latestVersion}). Continuing anyway to ensure schema is generated.`)
} else {
  console.log(`Updating ${PKG_NAME}: ${currentVersion ?? 'none'} → ${latestVersion}`)

  if (pkg.devDependencies && pkg.devDependencies[PKG_NAME] !== undefined) {
    pkg.devDependencies[PKG_NAME] = `^${latestVersion}`
  } else if (pkg.dependencies && pkg.dependencies[PKG_NAME] !== undefined) {
    pkg.dependencies[PKG_NAME] = `^${latestVersion}`
  } else {
    pkg.devDependencies = pkg.devDependencies || {}
    pkg.devDependencies[PKG_NAME] = `^${latestVersion}`
  }

  fs.writeFileSync(PKG_JSON_PATH, JSON.stringify(pkg, null, 2) + '\n')
  console.log('package.json updated.')
}

// 3. Load .env and install the package
run('pnpm', ['exec', 'dotenv', '-e', '.env', '--', 'pnpm', 'install', PKG_NAME])

// 4. Copy schema
fs.mkdirSync(path.join(ROOT_DIR, 'prisma'), { recursive: true })
fs.copyFileSync(
  path.join(ROOT_DIR, 'node_modules', PKG_NAME, 'schema.prisma'),
  path.join(ROOT_DIR, 'prisma', 'schema.prisma')
)
console.log('\n> Copied schema.prisma')

// 5. Generate Prisma client
run('pnpm', ['exec', 'prisma', 'generate'])

console.log(`\n✓ ${PKG_NAME}@${latestVersion} installed and Prisma client generated.`)
