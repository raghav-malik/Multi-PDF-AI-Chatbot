# Use an official Python image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy all project files
COPY . .

# Install system dependencies needed for building wheels (gcc, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc g++ make build-essential \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN pip install --upgrade pip

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port for Render
EXPOSE 8000

# Command to start your FastAPI app
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
