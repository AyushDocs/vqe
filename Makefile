.PHONY: help install test lint clean docker

help:
	@echo "Available commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make test       - Run tests"
	@echo "  make lint       - Run linters"
	@echo "  make clean      - Remove build artifacts"
	@echo "  make docker     - Build Docker image"

install:
	pip install -r requirements.txt

test:
	pytest tests/

lint:
	ruff check src/ tests/

clean:
	rm -rf build dist *.egg-info .pytest_cache .ruff_cache
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete

docker:
	docker build -t vqe-h2 .

activate:
	source .venv/bin/activate

notebook:
	.venv/bin/jupyter notebook notebooks/
