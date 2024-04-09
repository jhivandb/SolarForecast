FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy only the package.json and optionally pnpm-lock.yaml if present
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy the rest of your application code
COPY . .

EXPOSE 8080

# Start the application (adjust the script name if your start command differs)
CMD [ "pnpm", "run", "dev" ]
