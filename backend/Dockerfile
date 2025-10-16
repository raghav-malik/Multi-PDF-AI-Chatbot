# Use a fully compatible Python version
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy all backend files
COPY . .

# Upgrade pip (prevents build issues)
RUN pip install --upgrade pip

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port for Render
EXPOSE 10000

# Start the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]
