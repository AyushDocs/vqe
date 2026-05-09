# Build stage
FROM python:3.12-slim as builder

WORKDIR /build

COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Runtime stage
FROM python:3.12-slim

WORKDIR /app

COPY --from=builder /root/.local /root/.local
COPY vqe_h2_hydrogen.ipynb .
COPY README.md .

ENV PATH=/root/.local/bin:$PATH

CMD ["jupyter", "notebook", "--ip=0.0.0.0", "--port=8888", "--no-browser", "--allow-root"]
