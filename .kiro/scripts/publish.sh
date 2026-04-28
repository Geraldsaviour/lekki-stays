#!/bin/bash

# Auto-publish script with file cleanup, size enforcement, and auto-repo creation
set -e

# Configuration
GITHUB_USERNAME="Geraldsaviour"
REPO_NAME="lekki-stays"

# Function to generate README if it doesn't exist
generate_readme() {
    if [ ! -f "README.md" ]; then
        echo "📝 Generating README.md..."
        
        # Extract project info from package.json or use defaults
        project_name="Lekki Stays"
        description="Modern apartment booking platform for short-term stays in Lekki, Lagos"
        
        if [ -f "package.json" ]; then
            project_name=$(grep -o '"name"[[:space:]]*:[[:space:]]*"[^"]*"' package.json | cut -d'"' -f4 2>/dev/null || echo "Lekki Stays")
            description=$(grep -o '"description"[[:space:]]*:[[:space:]]*"[^"]*"' package.json | cut -d'"' -f4 2>/dev/null || echo "$description")
        fi
        
        cat > README.md << EOF
# $project_name

$description

## Features

- 🏠 Browse available apartments with detailed listings
- 📅 Real-time booking system with availability checking  
- 💳 Secure payment processing
- 📱 Responsive design for mobile and desktop
- 🔐 User authentication and profile management
- 📧 Automated booking confirmations and notifications

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: SQLite/JSON storage
- **Styling**: Modern CSS with custom properties
- **Icons**: Lucide Icons

## Getting Started

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/$GITHUB_USERNAME/$REPO_NAME.git
   cd $REPO_NAME
   \`\`\`

2. Install dependencies (if using Node.js):
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`

4. Open your browser and navigate to \`http://localhost:3000\`

## Project Structure

\`\`\`
├── index.html          # Main landing page
├── booking.html        # Booking interface
├── listing-*.html      # Individual apartment listings
├── api/               # Backend API endpoints
├── data/              # Database and seed files
└── assets/            # Static assets (CSS, JS, images)
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Auto-generated on $(date '+%Y-%m-%d %H:%M:%S')**
EOF
        
        echo "✅ README.md created successfully"
    fi
}

# Function to create GitHub repository if it doesn't exist
create_github_repo() {
    echo "🔍 Checking if GitHub repository exists..."
    
    # Check if repository exists by trying to fetch
    if ! git ls-remote origin &>/dev/null; then
        echo "📦 Repository doesn't exist, creating it..."
        
        # Try to create repository using GitHub CLI if available
        if command -v gh &> /dev/null; then
            echo "🚀 Creating repository using GitHub CLI..."
            gh repo create "$GITHUB_USERNAME/$REPO_NAME" --public --description "Modern apartment booking platform for Lekki, Lagos" --clone=false
            echo "✅ Repository created successfully"
        elif command -v curl &> /dev/null; then
            echo "🚀 Creating repository using GitHub API..."
            
            # Check if GITHUB_TOKEN is set
            if [ -z "$GITHUB_TOKEN" ]; then
                echo "⚠️  GITHUB_TOKEN environment variable not set."
                echo "   Please either:"
                echo "   1. Install GitHub CLI: winget install GitHub.cli"
                echo "   2. Or set GITHUB_TOKEN environment variable with your GitHub personal access token"
                echo "   3. Or create the repository manually at: https://github.com/new"
                echo ""
                echo "   Repository name: $REPO_NAME"
                echo "   Description: Modern apartment booking platform for Lekki, Lagos"
                echo "   Make it public and don't initialize with README"
                exit 1
            fi
            
            # Create repository using GitHub API
            response=$(curl -s -w "%{http_code}" -o /tmp/gh_response.json \
                -H "Authorization: token $GITHUB_TOKEN" \
                -H "Accept: application/vnd.github.v3+json" \
                -d "{\"name\":\"$REPO_NAME\",\"description\":\"Modern apartment booking platform for Lekki, Lagos\",\"private\":false}" \
                https://api.github.com/user/repos)
            
            if [ "$response" = "201" ]; then
                echo "✅ Repository created successfully via API"
            else
                echo "❌ Failed to create repository. Response code: $response"
                cat /tmp/gh_response.json 2>/dev/null || true
                exit 1
            fi
        else
            echo "⚠️  Neither GitHub CLI nor curl found. Please create the repository manually at:"
            echo "   https://github.com/new"
            echo "   Repository name: $REPO_NAME"
            echo "   Description: Modern apartment booking platform for Lekki, Lagos"
            echo "   Make it public and don't initialize with README"
            echo ""
            echo "   Then run this script again to continue with auto-publishing."
            exit 1
        fi
    else
        echo "✅ Repository already exists"
    fi
}

# Function to setup remote if not configured
setup_remote() {
    if ! git remote get-url origin &>/dev/null; then
        echo "🔗 Adding remote origin..."
        git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    fi
}

# Function to clean up unwanted files
cleanup_files() {
    echo "🧹 Cleaning up unwanted files..."
    find . -name ".DS_Store" -type f -delete 2>/dev/null || true
    find . -name "Thumbs.db" -type f -delete 2>/dev/null || true
    find . -name "*.log" -type f -delete 2>/dev/null || true
}

# Function to check file sizes and update .gitignore
check_file_sizes() {
    echo "📏 Checking file sizes..."
    large_files=$(find . -type f -size +50M -not -path "./.git/*" 2>/dev/null || true)
    
    if [ ! -z "$large_files" ]; then
        echo "⚠️  Found large files (>50MB), adding to .gitignore:"
        echo "$large_files" | while read -r file; do
            # Remove leading ./
            clean_file=$(echo "$file" | sed 's|^\./||')
            echo "  - $clean_file"
            
            # Add to .gitignore if not already there
            if ! grep -Fxq "$clean_file" .gitignore 2>/dev/null; then
                echo "$clean_file" >> .gitignore
            fi
        done
        
        # Stage the updated .gitignore
        git add .gitignore 2>/dev/null || true
    fi
}

# Function to generate commit message
generate_commit_message() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local changed_files=$(git diff --cached --name-only | head -5 | tr '\n' ' ')
    
    if [ -z "$changed_files" ]; then
        echo "Auto-update: $timestamp"
    else
        echo "Auto-update: $changed_files - $timestamp"
    fi
}

# Main execution
echo "🚀 Starting auto-publish process..."

# Generate README if it doesn't exist
generate_readme

# Setup remote origin
setup_remote

# Create GitHub repository if it doesn't exist
create_github_repo

# Clean up unwanted files first
cleanup_files

# Check for large files and update .gitignore
check_file_sizes

# Check if there are any changes to commit
git add . 2>/dev/null || true

if git diff --cached --quiet; then
    # No changes to commit, exit silently
    exit 0
fi

# Generate commit message and commit
commit_msg=$(generate_commit_message)
echo "📝 Committing changes: $commit_msg"

git commit -m "$commit_msg" 2>/dev/null || {
    echo "❌ Failed to commit changes"
    exit 1
}

# Push to current branch
current_branch=$(git branch --show-current)
echo "📤 Pushing to branch: $current_branch"

git push origin "$current_branch" 2>/dev/null || {
    echo "❌ Failed to push to GitHub"
    exit 1
}

echo "✅ Published to GitHub successfully"