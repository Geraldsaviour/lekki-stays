# Auto-publish script with file cleanup, size enforcement, and auto-repo creation
param()

# Configuration
$GITHUB_USERNAME = "Geraldsaviour"
$REPO_NAME = "lekki-stays"

# Load environment variables from .env file
if (Test-Path ".env") {
    Get-Content ".env" | ForEach-Object {
        if ($_ -match "^([^#][^=]+)=(.*)$") {
            [Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
        }
    }
}

# Function to generate README if it doesn't exist
function Generate-README {
    if (-not (Test-Path "README.md")) {
        Write-Host "Generating README.md..." -ForegroundColor Yellow
        
        $readmeLines = @()
        $readmeLines += "# Lekki Stays"
        $readmeLines += ""
        $readmeLines += "Modern apartment booking platform for short-term stays in Lekki, Lagos"
        $readmeLines += ""
        $readmeLines += "## Features"
        $readmeLines += ""
        $readmeLines += "* Browse available apartments with detailed listings"
        $readmeLines += "* Real-time booking system with availability checking"
        $readmeLines += "* Secure payment processing"
        $readmeLines += "* Responsive design for mobile and desktop"
        $readmeLines += "* User authentication and profile management"
        $readmeLines += "* Automated booking confirmations and notifications"
        $readmeLines += ""
        $readmeLines += "## Tech Stack"
        $readmeLines += ""
        $readmeLines += "* Frontend: HTML5, CSS3, JavaScript"
        $readmeLines += "* Backend: Node.js, Express.js"
        $readmeLines += "* Database: SQLite/JSON storage"
        $readmeLines += "* Styling: Modern CSS with custom properties"
        $readmeLines += "* Icons: Lucide Icons"
        $readmeLines += ""
        $readmeLines += "## Getting Started"
        $readmeLines += ""
        $readmeLines += "1. Clone the repository"
        $readmeLines += "2. Install dependencies (if using Node.js): npm install"
        $readmeLines += "3. Start the development server: npm start"
        $readmeLines += "4. Open your browser and navigate to http://localhost:3000"
        $readmeLines += ""
        $readmeLines += "## License"
        $readmeLines += ""
        $readmeLines += "This project is licensed under the MIT License."
        $readmeLines += ""
        $readmeLines += "Auto-generated on $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")"
        
        $readmeLines | Out-File -FilePath "README.md" -Encoding UTF8
        Write-Host "README.md created successfully" -ForegroundColor Green
    }
}

# Function to create GitHub repository if it doesn't exist
function Create-GitHubRepo {
    Write-Host "Checking if GitHub repository exists..." -ForegroundColor Yellow
    
    $repoExists = $false
    try {
        git ls-remote origin 2>$null | Out-Null
        $repoExists = $true
    } catch {
        $repoExists = $false
    }
    
    if (-not $repoExists) {
        Write-Host "Repository doesn't exist, creating it..." -ForegroundColor Yellow
        
        if (Get-Command gh -ErrorAction SilentlyContinue) {
            Write-Host "Creating repository using GitHub CLI..." -ForegroundColor Yellow
            try {
                gh repo create "$GITHUB_USERNAME/$REPO_NAME" --public --description "Modern apartment booking platform for Lekki, Lagos" --clone=false
                Write-Host "Repository created successfully" -ForegroundColor Green
            } catch {
                Write-Host "Failed to create repository with GitHub CLI" -ForegroundColor Red
                exit 1
            }
        } elseif ($env:GITHUB_TOKEN) {
            Write-Host "Creating repository using GitHub API..." -ForegroundColor Yellow
            
            $headers = @{
                "Authorization" = "token $($env:GITHUB_TOKEN)"
                "Accept" = "application/vnd.github.v3+json"
                "Content-Type" = "application/json"
            }
            
            $body = @{
                name = $REPO_NAME
                description = "Modern apartment booking platform for Lekki, Lagos"
                private = $false
            } | ConvertTo-Json
            
            try {
                $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body
                Write-Host "Repository created successfully via API" -ForegroundColor Green
            } catch {
                Write-Host "Failed to create repository via API: $($_.Exception.Message)" -ForegroundColor Red
                exit 1
            }
        } else {
            Write-Host "GitHub CLI not found and no GITHUB_TOKEN set." -ForegroundColor Yellow
            exit 1
        }
    } else {
        Write-Host "Repository already exists" -ForegroundColor Green
    }
}

# Function to setup remote if not configured
function Setup-Remote {
    try {
        git remote get-url origin 2>$null | Out-Null
    } catch {
        Write-Host "Adding remote origin..." -ForegroundColor Yellow
        git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    }
}

# Function to clean up unwanted files
function Cleanup-Files {
    Write-Host "Cleaning up unwanted files..." -ForegroundColor Yellow
    
    Get-ChildItem -Path . -Name ".DS_Store" -Recurse -Force | Remove-Item -Force -ErrorAction SilentlyContinue
    Get-ChildItem -Path . -Name "Thumbs.db" -Recurse -Force | Remove-Item -Force -ErrorAction SilentlyContinue
    Get-ChildItem -Path . -Name "*.log" -Recurse -Force | Remove-Item -Force -ErrorAction SilentlyContinue
}

# Function to check file sizes and update .gitignore
function Check-FileSizes {
    Write-Host "Checking file sizes..." -ForegroundColor Yellow
    
    $largeFiles = Get-ChildItem -Path . -Recurse -File | Where-Object { 
        $_.Length -gt 50MB -and $_.FullName -notlike "*\.git\*" 
    }
    
    if ($largeFiles) {
        Write-Host "Found large files (>50MB), adding to .gitignore:" -ForegroundColor Yellow
        
        foreach ($file in $largeFiles) {
            $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
            Write-Host "  - $relativePath" -ForegroundColor Cyan
            
            $gitignoreContent = ""
            if (Test-Path ".gitignore") {
                $gitignoreContent = Get-Content ".gitignore" -Raw
            }
            
            if ($gitignoreContent -notlike "*$relativePath*") {
                Add-Content -Path ".gitignore" -Value $relativePath
            }
        }
        
        git add .gitignore 2>$null
    }
}

# Function to generate commit message
function Generate-CommitMessage {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    
    try {
        $changedFiles = git diff --cached --name-only | Select-Object -First 5
        if ($changedFiles) {
            $fileList = $changedFiles -join " "
            return "Auto-update: $fileList - $timestamp"
        }
    } catch {
        # Fallback if git command fails
    }
    
    return "Auto-update: $timestamp"
}

# Main execution
Write-Host "Starting auto-publish process..." -ForegroundColor Green

Generate-README
Setup-Remote
Create-GitHubRepo
Cleanup-Files
Check-FileSizes

git add . 2>$null

$hasChanges = $false
try {
    git diff --cached --quiet
    $hasChanges = $LASTEXITCODE -ne 0
} catch {
    $hasChanges = $true
}

if (-not $hasChanges) {
    exit 0
}

$commitMsg = Generate-CommitMessage
Write-Host "Committing changes: $commitMsg" -ForegroundColor Yellow

try {
    git commit -m $commitMsg 2>$null
} catch {
    Write-Host "Failed to commit changes" -ForegroundColor Red
    exit 1
}

try {
    $currentBranch = git branch --show-current
    Write-Host "Pushing to branch: $currentBranch" -ForegroundColor Yellow
    
    git push origin $currentBranch 2>$null
    Write-Host "Published to GitHub successfully" -ForegroundColor Green
} catch {
    Write-Host "Failed to push to GitHub" -ForegroundColor Red
    exit 1
}