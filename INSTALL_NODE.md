# Installing Node.js and npm

Node.js and npm are required to run this project. The project requires **Node.js 20.x or higher**.

## Option 1: Install using Homebrew (Recommended for macOS)

### Step 1: Install Homebrew (if you don't have it)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Step 2: Install Node.js

```bash
brew install node
```

### Step 3: Verify installation

```bash
node --version
npm --version
```

You should see version 20.x or higher.

## Option 2: Install using nvm (Node Version Manager) - Recommended

nvm allows you to install and manage multiple Node.js versions.

### Step 1: Install nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### Step 2: Restart your terminal or run:

```bash
source ~/.zshrc
# or if using bash:
# source ~/.bash_profile
```

### Step 3: Install Node.js 20

```bash
nvm install 20
nvm use 20
```

### Step 4: Verify installation

```bash
node --version
npm --version
```

## Option 3: Download from nodejs.org

1. Go to https://nodejs.org/
2. Download the LTS version (20.x or higher)
3. Run the installer
4. Restart your terminal
5. Verify installation:
   ```bash
   node --version
   npm --version
   ```

## After Installation

Once Node.js and npm are installed, you can run the project:

```bash
# Navigate to project directory
cd vibe-portfolio

# Install dependencies
npm install

# Run the site
npm run ingest:docx  # Parse resume
npm run seed:images  # Download images
npm run dev          # Start dev server
```

## Troubleshooting

### Command not found after installation

- **Restart your terminal** after installing Node.js
- Or run: `source ~/.zshrc` (for zsh) or `source ~/.bash_profile` (for bash)

### Using nvm but node not found

- Make sure nvm is loaded in your shell
- Add to `~/.zshrc` or `~/.bash_profile`:
  ```bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  ```

### Version mismatch

- The project requires Node.js 20.x
- Check your version: `node --version`
- If using nvm: `nvm use 20`

## Verify Installation

Run these commands to verify everything is working:

```bash
node --version   # Should show v20.x.x or higher
npm --version    # Should show 10.x.x or higher
```

Once both commands work, you're ready to run the project!
