# Stage 1: Build the application
FROM node:18-alpine as build-stage

# Set the working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (or pnpm-lock.yml) file
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy the rest of your application code
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Serve the built application
FROM node:18-alpine as serve-stage

# Set the working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Only copy the built application and any runtime dependencies from the build stage
COPY --from=build-stage /app/dist ./dist
COPY package.json pnpm-lock.yaml* ./

# Install only production dependencies
RUN pnpm install --prod

# Expose the port your app runs on
EXPOSE 8080

# Command to run your app using `pnpm preview` or similar
CMD ["pnpm", "preview"]
