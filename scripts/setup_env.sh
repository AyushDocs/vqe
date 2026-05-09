#!/bin/bash
# Environment setup script

echo "Setting up VQE H2 environment..."

# Check Python version
python_version=$(python3 --version 2>&1 | awk '{print $2}')
echo "Python version: $python_version"

# Create virtual environment if needed
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
fi

# Activate and install
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

echo "Setup complete!"
