#!/usr/bin/env python3

"""
Portfolio Project Snapshot Generator
Generates optimized Markdown snapshot of Angular portfolio project.
"""

import logging
import os
import subprocess
from datetime import datetime
from pathlib import Path

logging.basicConfig(level=logging.INFO)

def is_binary_file(file_path):
    """Check if file is binary based on extension."""
    binary_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg',
                        '.pdf', '.woff', '.woff2', '.webp', '.ttf'}
    return Path(file_path).suffix.lower() in binary_extensions

def ensure_output_directory(output_dir):
    """Create output directory if needed."""
    Path(output_dir).mkdir(parents=True, exist_ok=True)

def get_git_info(root_dir):
    """Retrieve essential Git information."""
    git_info = {
        'last_commits': subprocess.run(
            ["git", "log", "-5", "--pretty=format:%h: %s%n"],
            capture_output=True, text=True, cwd=root_dir
        ).stdout,
        'current_branch': subprocess.run(
            ["git", "branch", "--show-current"],
            capture_output=True, text=True, cwd=root_dir
        ).stdout.strip(),
        'status': subprocess.run(
            ["git", "status", "--short"],
            capture_output=True, text=True, cwd=root_dir
        ).stdout
    }
    return git_info

def process_file_content(content):
    """Optimize file content by removing redundant information."""
    lines = []
    skip_block = False

    for line in content.split('\n'):
        # Skip license blocks and redundant comments
        # if any(x in line.lower() for x in ['license', 'copyright', '@author']):
        #     skip_block = True
        #     continue

        if skip_block:
            if not line.strip():
                skip_block = False
            continue

        # Skip consecutive empty lines
        if not line.strip() and lines and not lines[-1].strip():
            continue

        # Skip basic TypeScript interface comments
        if '/**' in line and 'interface' in next((l for l in content.split('\n')), ''):
            continue

        lines.append(line)

    return '\n'.join(lines)

def should_include_file(filename, relative_path):
    """Determine if file should be included in snapshot."""
    excluded_extensions = {'.map', '.log', '.tmp', '.bak', '.d.ts'}
    excluded_files = {
        'browserslist', '.npmrc', 'tsconfig.app.json',
        'karma.conf.js', 'package-lock.json', '.editorconfig'
    }

    # Skip test files except core tests
    if '.spec.' in filename and 'core' not in relative_path:
        return False

    # Skip migration files
    if 'migration' in relative_path.lower():
        return False

    return (Path(filename).suffix not in excluded_extensions and
            filename not in excluded_files)

def write_file_content(f, file_path, relative_path):
    """Write optimized file content to snapshot."""
    extension = Path(file_path).suffix[1:] or 'txt'
    f.write(f"#### {relative_path}\n```{extension}\n")
    try:
        with open(file_path, 'r', encoding='utf-8') as code_file:
            content = code_file.read()
            optimized_content = process_file_content(content)
            f.write(optimized_content)
    except Exception as e:
        f.write(f"// Error reading file: {str(e)}\n")
    f.write("```\n\n")

def generate_markdown(root_dir, output_file):
    """Generate optimized Markdown snapshot."""
    excluded_dirs = {
        'node_modules', '.git', '.idea', 'dist', 'coverage',
        '.angular', '.vscode', 'e2e', '__pycache__', 'tmp',
        'toolsEVarie'
    }

    primary_groups = {
        'Core': ['app.component', 'app.config', 'app.routes'],
        'Features': ['component.ts', 'service.ts', 'store.ts'],
        'Shared': ['model.ts', 'interface.ts'],
        'Config': ['environment.ts'],
    }

    files_by_group = {group: [] for group in primary_groups}
    files_by_group['Other'] = []

    git_info = get_git_info(root_dir)

    with open(output_file, 'w', encoding='utf-8') as f:
        # Write minimal header
        f.write(f"# Portfolio Snapshot {datetime.now().strftime('%Y-%m-%d %H:%M')}\n\n")
        f.write(f"Branch: `{git_info['current_branch']}`\n\n")
        f.write("Recent commits:\n```\n" + git_info['last_commits'] + "```\n\n")

        # Collect and categorize files
        for dirpath, dirnames, filenames in os.walk(root_dir):
            if 'toolsEVarie' in Path(dirpath).parts:
              continue

            dirnames[:] = [d for d in dirnames if d not in excluded_dirs]
            rel_path = os.path.relpath(dirpath, root_dir)

            if any(part.startswith('.') for part in Path(rel_path).parts):
                continue

            for filename in filenames:
                if not should_include_file(filename, rel_path):
                    continue

                file_path = Path(dirpath) / filename
                if is_binary_file(file_path):
                    continue

                relative_path = os.path.relpath(file_path, root_dir)

                # Categorize file
                categorized = False
                for group, patterns in primary_groups.items():
                    if any(pattern in relative_path for pattern in patterns):
                        files_by_group[group].append((relative_path, file_path))
                        categorized = True
                        break

                if not categorized:
                    files_by_group['Other'].append((relative_path, file_path))

        # Write files by group
        for group, files in files_by_group.items():
            if files:
                f.write(f"## {group}\n\n")
                for relative_path, file_path in sorted(files):
                    write_file_content(f, file_path, relative_path)

def main():
    """Main entry point."""
    project_root = Path(__file__).parent.parent
    output_dir = project_root / "toolsEVarie" / "markdownRepoComplessivo"
    ensure_output_directory(output_dir)

    timestamp = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
    output_file = output_dir / f"portfolio_snapshot_{timestamp}.md"

    logging.info("Generating optimized snapshot...")
    generate_markdown(project_root, output_file)
    logging.info(f"Snapshot generated: {output_file}")

if __name__ == "__main__":
    main()
