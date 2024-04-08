# Use an official Python runtime as a parent image
FROM python:3.11-slim-bullseye

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8002

# Run Gunicorn with 4 worker processes, binding on 0.0.0.0:8000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8002", "app:app"]
