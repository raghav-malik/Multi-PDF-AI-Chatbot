# =========================
# 1️⃣ Build Stage — install dependencies
# =========================
FROM python:3.12-slim AS builder

# Set working directory
WORKDIR /app

# Install build dependencies temporarily
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc g++ make build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirement files first (for better layer caching)
COPY requirements.txt .

# Upgrade pip & install dependencies into /install directory
RUN pip install --upgrade pip \
    && pip install --no-cache-dir --prefix=/install -r requirements.txt


# =========================
# 2️⃣ Final Stage — minimal runtime image
# =========================
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy installed dependencies from builder image
COPY --from=builder /install /usr/local

# Copy the actual application code
COPY . .

# Set environment variables for FastAPI + Render
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8000

# Expose port for Render
EXPOSE 8000

# Healthcheck (optional but helpful for Render)
HEALTHCHECK CMD curl --fail http://localhost:8000/health || exit 1

# Run FastAPI app
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
