#!/usr/bin/env python3

"""
Portfolio Project Snapshot Generator
Generate a comprehensive Markdown snapshot of an Angular portfolio project.
"""

import logging
import os
import subprocess
from datetime import datetime
from pathlib import Path

logging.basicConfig(level=logging.INFO)

def is_binary_file(file_path):
    """Check if a file is binary based on its extension."""
    binary_extensions = [
        '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.ico', '.svg',
        '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
        '.zip', '.tar', '.gz', '.rar', '.7z', '.exe', '.dll', '.so',
        '.dylib', '.woff', '.woff2', '.ttf', '.eot'
    ]
    return Path(file_path).suffix.lower() in binary_extensions

def ensure_output_directory(output_dir):
    """Create output directory if it doesn't exist."""
    Path(output_dir).mkdir(parents=True, exist_ok=True)

def get_git_info(root_dir):
    """Retrieve detailed Git information about the project."""
    git_info = {
        'last_commits': subprocess.run(
            ["git", "log", "-10", "--pretty=format:%h%n%s%n%b%n----------------%n"],
            capture_output=True, text=True, cwd=root_dir
        ).stdout,
        'current_branch': subprocess.run(
            ["git", "branch", "--show-current"],
            capture_output=True, text=True, cwd=root_dir
        ).stdout.strip(),
        'status': subprocess.run(
            ["git", "status"], #, "--short"
            capture_output=True, text=True, cwd=root_dir
        ).stdout
    }
    return git_info

def generate_markdown(root_dir, output_file):
    """Generate a Markdown snapshot of the project."""
    # Directories to exclude from the snapshot
    excluded_dirs = [
        'node_modules', '.git', '.idea', 'dist', 'out', 'build',
        '.angular', '.vscode', 'public', 'coverage', 'e2e',
        '__pycache__', 'tmp', 'toolsEVarie', '.github',
        'docs', 'test', 'tests'
    ]

    # Files to exclude from the snapshot
    excluded_files = [
        '.gitignore', '.editorconfig', 'package-lock.json',
        'browserlist', '.prettierrc', '.eslintrc',
        'karma.conf.js', 'tsconfig.*.json', 'README.md',
        'CHANGELOG.md', 'LICENSE', '.env', '.env.*'
    ]

    # Get Git information
    git_info = get_git_info(root_dir)

    with open(output_file, 'w', encoding='utf-8') as f:
        # Write header with timestamp
        f.write(f"# Portfolio App Repository Snapshot\n\n")
        f.write(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")

        # Write Git information
        f.write("## Git Status\n\n")
        f.write(f"Current Branch: `{git_info['current_branch']}`\n\n")
        f.write("### Last 10 Commits (with full messages)\n\n")
        f.write("```\n" + git_info['last_commits'] + "\n```\n\n")
        f.write("### Working Directory Status\n\n")
        f.write("```\n" + git_info['status'] + "\n```\n\n")

        f.write("## Project Files\n\n")

        # File grouping configuration
        file_groups = {
            'Core Configuration': ['.json', '.conf.js', '.config.ts'],
            'Components': ['component.ts', 'component.html', 'component.scss'],
            'Services': ['service.ts'],
            'Models & Interfaces': ['model.ts', 'interface.ts', 'enum.ts', 'type.ts'],
            'State Management': ['store.ts', 'actions.ts', 'reducers.ts', 'effects.ts', 'selectors.ts'],
            'Routing': ['routing.ts', 'routes.ts', 'guard.ts'],
            'Shared': ['module.ts', 'pipe.ts', 'directive.ts'],
            'Assets': ['style.scss', 'variables.scss', 'mixins.scss'],
            'Testing': ['spec.ts'],
            'Other': []
        }

        files_by_group = {group: [] for group in file_groups}

        # Collect and categorize files
        for dirpath, dirnames, filenames in os.walk(root_dir):
            # Filter out excluded directories
            dirnames[:] = [d for d in dirnames if d not in excluded_dirs]
            rel_path = os.path.relpath(dirpath, root_dir)

            # Skip dot directories
            if any(part.startswith('.') for part in Path(rel_path).parts):
                continue

            for filename in filenames:
                if filename in excluded_files or filename.startswith('.'):
                    continue

                file_path = Path(dirpath) / filename
                if is_binary_file(file_path):
                    continue

                relative_path = os.path.relpath(file_path, root_dir)

                # Categorize file
                grouped = False
                for group, extensions in file_groups.items():
                    if any(relative_path.endswith(ext) for ext in extensions):
                        files_by_group[group].append((relative_path, file_path))
                        grouped = True
                        break

                if not grouped:
                    files_by_group['Other'].append((relative_path, file_path))

        # Write files by group
        for group, files in files_by_group.items():
            if files:
                f.write(f"### {group}\n\n")
                for relative_path, file_path in sorted(files):
                    f.write(f"#### {relative_path}\n\n")
                    extension = Path(file_path).suffix[1:] or 'txt'
                    f.write(f"```{extension}\n")
                    try:
                        with open(file_path, 'r', encoding='utf-8') as code_file:
                            f.write(code_file.read())
                    except UnicodeDecodeError:
                        f.write(f"// File non leggibile: {relative_path}\n")
                    except Exception as e:
                        f.write(f"// Errore nella lettura del file: {str(e)}\n")
                    f.write("\n```\n\n")





def main():
    """Main entry point for the script."""
    # Get project root (one level up from toolsEVarie)
    project_root = Path(__file__).parent.parent

    # Set up output directory
    output_dir = project_root / "toolsEVarie" / "markdownRepoComplessivo"
    ensure_output_directory(output_dir)

    # Create output filename with timestamp
    timestamp = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
    output_file = output_dir / f"portfolio_app_snapshot_{timestamp}.md"

    logging.info(f"Generating Markdown file for project...")
    generate_markdown(project_root, output_file)
    logging.info(f"Markdown file generated: {output_file}")

if __name__ == "__main__":
    main()


# #                    ## Usage Instructions
# #
# #
# #                    To generate a new snapshot:
# #
# #                    1. Navigate to the toolsEVarie directory:
# #                      ```bash
# #                      cd toolsEVarie
# #                      ```
# #
# #                    2. Run the script:
# #                      ```bash
# #                      python3 fromAngularProjectToMarkdown.py
# #                      ```
# #
# #                    The script will:
# #                    - Generate a new Markdown file in `/toolsEVarie/markdownRepoComplessivo`
# #                    - Include the last 10 Git commits with full messages
# #                    - Organize project files by type
# #                    - Exclude non-essential directories and files
# #                    - Add timestamp to the filename
# #
# #                    Note: This script requires Python 3.6+ and assumes it's run from the toolsEVarie directory.
