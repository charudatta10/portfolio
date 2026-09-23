# Justfile

# Create or activate uv environment
env:
    uv run python -c "import sys; print(sys.executable)"


# Run main.py inside uv env
run:
    uv run python main.py