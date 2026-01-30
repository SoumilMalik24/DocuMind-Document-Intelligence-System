# ---------------------------------------------
# Base image
# ---------------------------------------------
FROM python:3.11-slim

# ---------------------------------------------
# Set working directory
# ---------------------------------------------
WORKDIR /app

# ---------------------------------------------
# Install system dependencies
# ---------------------------------------------
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# ---------------------------------------------
# Copy requirements first (layer caching)
# ---------------------------------------------
COPY requirements.txt .

# ---------------------------------------------
# Install Python dependencies
# ---------------------------------------------
RUN pip install --no-cache-dir -r requirements.txt

# ---------------------------------------------
# Copy backend source code
# ---------------------------------------------
COPY src ./src
ENV PYTHONPATH=/app/src

# ---------------------------------------------
# Expose FastAPI port
# ---------------------------------------------
EXPOSE 8000

# ---------------------------------------------
# Start FastAPI server
# ---------------------------------------------
CMD ["uvicorn", "api.app:app", "--host", "0.0.0.0", "--port", "8000"]
