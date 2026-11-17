# 🐳 Docker Complete Guide — Beginner to Advanced

A complete, practical guide to Docker: from your first container to multi-stage production builds, Compose, registries, security, and multi-platform images. It also includes a **Git & GitHub command reference** for pushing this project to GitHub.
All examples use a small **Node.js (Express)** app, but the concepts apply to any language.

---

## 📑 Table of Contents

1. [What is Docker?](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#1-what-is-docker)
2. [Installation](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#2-installation)
3. [Project Setup (Sample App)](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#3-project-setup-sample-app)
4. [Dockerfile Explained](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#4-dockerfile-explained)
5. [.dockerignore](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#5-dockerignore)
6. [Build the Image](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#6-build-the-image)
7. [Run the Container](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#7-run-the-container)
8. [Go Inside the Container & View Logs](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#8-go-inside-the-container--view-logs)
9. [Managing Containers](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#9-managing-containers)
10. [Managing Images](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#10-managing-images)
11. [Environment Variables](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#11-environment-variables)
12. [Volumes & Bind Mounts](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#12-volumes--bind-mounts)
13. [Networking](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#13-networking)
14. [Docker Compose](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#14-docker-compose)
15. [Docker Hub & GitHub Container Registry](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#15-docker-hub--github-container-registry)
16. [Multi-Stage Builds](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#16-multi-stage-builds)
17. [Healthchecks, Restart Policies & Limits](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#17-healthchecks-restart-policies--limits)
18. [Debugging & Troubleshooting](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#18-debugging--troubleshooting)
19. [Cleanup](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#19-cleanup)
20. [Security Best Practices](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#20-security-best-practices)
21. [Advanced Topics](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#21-advanced-topics)
22. [CI/CD: Build & Push with GitHub Actions](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#22-cicd-build--push-with-github-actions)
23. [Git & GitHub Commands](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#23-git--github-commands)
24. [Docker Cheat Sheet](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#24-docker-cheat-sheet)

---

## 1\. What is Docker?

Docker packages an application **with everything it needs** (runtime, libraries, config) into a portable unit that runs the same everywhere — your laptop, a teammate's machine, or a cloud server.

| Term           | Meaning                                          | Analogy                   |
| -------------- | ------------------------------------------------ | ------------------------- |
| **Image**      | Read-only template: app + dependencies + OS libs | A class / a recipe        |
| **Container**  | A running instance of an image                   | An object / a cooked dish |
| **Dockerfile** | Text file with instructions to build an image    | The recipe card           |
| **Registry**   | Storage for images (Docker Hub, GHCR, ECR)       | GitHub, but for images    |
| **Volume**     | Persistent storage outside the container         | An external hard drive    |
| **Network**    | Virtual network so containers can talk           | A private LAN             |
| **Compose**    | YAML file to run many containers together        | An orchestra conductor    |

**Why containers instead of VMs?** Containers share the host kernel, so they start in seconds, use far less memory, and are much smaller than virtual machines.

---

## 2\. Installation

### Windows / macOS

Install **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**. On Windows, enable the WSL 2 backend when prompted.

### Linux (Ubuntu/Debian)

```
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER   # use docker without sudo
# log out and log back in for the group change to apply
```

### Verify

```
docker --version
docker compose version
docker info
docker run hello-world
```

---

## 3\. Project Setup \(Sample App\)

```
my-node-app/
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
├── package.json
├── package-lock.json
└── server.js
```

**package.json**

```
{
  "name": "my-node-app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
}
```

**server.js**

```
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("Hello from Docker!"));
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Listen on 0.0.0.0 so the app is reachable from outside the container
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
```

Run `npm install` once locally so `package-lock.json` is created.

---

## 4\. Dockerfile Explained

```
# Base image — pin a version; alpine = small Linux
FROM node:20-alpine

# Working directory inside the container
WORKDIR /app

# Copy dependency files first to use Docker's layer cache
COPY package*.json ./

# Install exact production dependencies from the lock file
RUN npm ci --omit=dev

# Copy the rest of the source code
COPY . .

# Default environment variables (override with -e at runtime)
ENV NODE_ENV=production
ENV PORT=8080

# Documents the port the app uses (publishing is done with -p)
EXPOSE 8080

# Run as non-root user (provided by the official Node image)
USER node

# Default start command (exec form handles signals correctly)
CMD ["node", "server.js"]
```

### Why copy `package*.json` before the source code?

Each instruction creates a **cached layer**. If only `server.js` changes, Docker reuses the cached `npm ci` layer, so rebuilds take seconds instead of minutes.

### All Dockerfile Instructions

| Instruction   | Purpose                                            | Example                                                                                                         |
| ------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `FROM`        | Base image                                         | `FROM node:20-alpine`                                                                                           |
| `WORKDIR`     | Set working directory                              | `WORKDIR /app`                                                                                                  |
| `COPY`        | Copy files from build context                      | `COPY . .`                                                                                                      |
| `ADD`         | Like COPY + extracts archives / URLs (prefer COPY) | `ADD app.tar.gz /app`                                                                                           |
| `RUN`         | Execute command at **build** time                  | `RUN npm ci`                                                                                                    |
| `CMD`         | Default command at **run** time (overridable)      | `CMD ["node","server.js"]`                                                                                      |
| `ENTRYPOINT`  | Fixed executable; CMD becomes its args             | `ENTRYPOINT ["node"]`                                                                                           |
| `ENV`         | Environment variable (build + run)                 | `ENV PORT=8080`                                                                                                 |
| `ARG`         | Build-time-only variable                           | `ARG VERSION=1.0`                                                                                               |
| `EXPOSE`      | Document a port                                    | `EXPOSE 8080`                                                                                                   |
| `USER`        | Switch user                                        | `USER node`                                                                                                     |
| `VOLUME`      | Declare a mount point                              | `VOLUME ["/data"]`                                                                                              |
| `LABEL`       | Metadata                                           | `LABEL maintainer="you@mail.com"`                                                                               |
| `HEALTHCHECK` | Container health test                              | see [§17](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#17-healthchecks-restart-policies--limits) |
| `SHELL`       | Change default shell for RUN                       | `SHELL ["/bin/bash","-c"]`                                                                                      |
| `STOPSIGNAL`  | Signal sent on `docker stop`                       | `STOPSIGNAL SIGTERM`                                                                                            |

### `CMD` vs `ENTRYPOINT` vs `RUN`

- **RUN** — runs while **building** the image (install packages).
- **CMD** — default command when the container **starts**; replaced by `docker run image <cmd>`.
- **ENTRYPOINT** — always runs; extra `docker run` args are appended. Override with `--entrypoint`.

---

## 5\. \.dockerignore

Keeps the build context small and prevents secrets/local junk from entering the image.

```
node_modules
npm-debug.log
.git
.gitignore
.env
Dockerfile
docker-compose.yml
README.md
coverage
dist
```

---

## 6\. Build the Image

```
docker build -t my-node-app .
```

| Part             | Meaning                                                  |
| ---------------- | -------------------------------------------------------- |
| `-t my-node-app` | Image name (`name:tag`; default tag is `latest`)         |
| `.`              | **Build context** — the folder containing the Dockerfile |

> ⚠️ The last argument is a **folder**, not the Dockerfile. If your Dockerfile has another name or location, use `-f`:
>
> ```
> docker build -t my-node-app -f path/to/Dockerfile path/to/project
>
> ```

**More build options**

```
docker build -t my-node-app:1.0 .                          # version tag
docker build -t my-node-app:1.0 -t my-node-app:latest .    # multiple tags
docker build --no-cache -t my-node-app .                   # rebuild everything
docker build --build-arg VERSION=2.0 -t my-node-app .      # pass ARG
docker build --progress=plain -t my-node-app .             # detailed output
docker build --target builder -t my-node-app:build .       # build up to a stage
```

**Verify**

```
docker images
docker history my-node-app   # layers and sizes
```

---

## 7\. Run the Container

```
# Interactive, see output in terminal (Ctrl+C to stop)
docker run -it -p 8080:8080 my-node-app

# With a name
docker run --name my-container my-node-app:latest

# Recommended: background + name + port + auto-restart
docker run -d --name my-container -p 8080:8080 --restart unless-stopped my-node-app:latest
```

Open **http://localhost:8080** or test with:

```
curl http://localhost:8080
curl http://localhost:8080/health
```

### `docker run` flags

| Flag                 | Meaning                                        |
| -------------------- | ---------------------------------------------- |
| `-p HOST:CONTAINER`  | Publish a port, e.g. `-p 3000:8080`            |
| `-d`                 | Detached (background)                          |
| `-it`                | Interactive terminal                           |
| `--name`             | Container name                                 |
| `--rm`               | Auto-remove when stopped                       |
| `-e KEY=value`       | Environment variable                           |
| `--env-file .env`    | Load env vars from file                        |
| `-v source:/path`    | Mount volume or folder                         |
| `--network name`     | Join a network                                 |
| `--restart policy`   | `no`, `on-failure`, `always`, `unless-stopped` |
| `--memory`, `--cpus` | Resource limits                                |
| `--entrypoint`       | Override ENTRYPOINT                            |

**One-off commands in a new container**

```
docker run --rm my-node-app node -v
docker run --rm -it my-node-app sh
```

---

## 8\. Go Inside the Container & View Logs

```
# Find the container ID or name
docker ps

# Open a shell inside the running container
docker exec -it <container_id_or_name> sh     # Alpine images
docker exec -it <container_id_or_name> bash   # Debian/Ubuntu images
docker exec -it -u root my-container sh       # as root

# Leave the shell (container keeps running)
exit
```

**Run a single command**

```
docker exec my-container ls -la /app
docker exec my-container env
```

**Logs**

```
docker logs my-container              # all logs
docker logs -f my-container           # follow live
docker logs --tail 100 my-container   # last 100 lines
docker logs --since 10m my-container  # last 10 minutes
docker logs -t my-container           # with timestamps
```

**Copy files in/out**

```
docker cp my-container:/app/server.js ./server.js
docker cp ./config.json my-container:/app/config.json
```

**Attach** to the main process: `docker attach my-container` (detach with `Ctrl+P`, `Ctrl+Q`).

---

## 9\. Managing Containers

```
docker ps                     # running
docker ps -a                  # all (incl. stopped)
docker stop my-container      # graceful stop
docker start my-container     # start again
docker restart my-container
docker kill my-container      # force stop
docker pause my-container
docker unpause my-container
docker rm my-container        # remove stopped container
docker rm -f my-container     # stop + remove
docker rename old new
docker inspect my-container   # full JSON details
docker stats                  # live CPU / RAM
docker top my-container       # processes
docker port my-container      # port mappings
docker diff my-container      # changed files
```

**Lifecycle:** `created → running → paused → stopped (exited) → removed`

---

## 10\. Managing Images

```
docker images                                   # list
docker pull node:20-alpine                      # download
docker tag my-node-app username/my-node-app:1.0 # add tag
docker rmi my-node-app                          # remove
docker image prune                              # remove dangling
docker image prune -a                           # remove all unused
docker save -o my-node-app.tar my-node-app      # export to file
docker load -i my-node-app.tar                  # import from file
docker image inspect my-node-app
```

---

## 11\. Environment Variables

```
docker run -e PORT=3000 -p 3000:3000 my-node-app
docker run --env-file .env my-node-app
```

**.env**

```
PORT=8080
DB_HOST=db
DB_USER=admin
DB_PASS=secret
```

> 🔒 Never put secrets in the Dockerfile (`ENV PASSWORD=...`) or copy `.env` into the image. Pass them at runtime or use secrets ([§21](https://claude.ai/chat/73c2d3fa-5870-407d-9d2a-9bb8d8d4a0be#21-advanced-topics)).

---

## 12\. Volumes & Bind Mounts

Data written inside a container is **lost** when the container is removed. Use storage outside it.

| Type         | Managed by        | Best for                    | Syntax             |
| ------------ | ----------------- | --------------------------- | ------------------ |
| Named volume | Docker            | Databases, persistent data  | `-v mydata:/data`  |
| Bind mount   | You (host folder) | Development, live reload    | `-v "$(pwd)":/app` |
| tmpfs        | RAM               | Temporary / sensitive files | `--tmpfs /tmp`     |

**Named volume**

```
docker volume create mydata
docker run -d --name db -e POSTGRES_PASSWORD=pass \
  -v mydata:/var/lib/postgresql/data postgres:16
docker volume ls
docker volume inspect mydata
docker volume rm mydata
```

**Bind mount for development**

```
# Linux / macOS
docker run -it -p 8080:8080 -v "$(pwd)":/app -v /app/node_modules my-node-app

# Windows PowerShell
docker run -it -p 8080:8080 -v "${PWD}:/app" -v /app/node_modules my-node-app
```

The extra `-v /app/node_modules` stops your local folder from hiding the container's `node_modules`.
Read-only: `-v "$(pwd)/config":/app/config:ro`

---

## 13\. Networking

Containers on the same user-defined network reach each other **by container name**.

```
docker network create mynet

docker run -d --name db --network mynet -e POSTGRES_PASSWORD=pass postgres:16
docker run -d --name api --network mynet -p 8080:8080 -e DB_HOST=db my-node-app
# Inside "api", the database host is simply: db
```

```
docker network ls
docker network inspect mynet
docker network connect mynet my-container
docker network disconnect mynet my-container
docker network rm mynet
```

| Driver    | Use                        |
| --------- | -------------------------- |
| `bridge`  | Default, single host       |
| `host`    | Share host network (Linux) |
| `none`    | No networking              |
| `overlay` | Multi-host (Swarm)         |

Reach the **host machine** from a container: `host.docker.internal` (on Linux add `--add-host=host.docker.internal:host-gateway`).

---

## 14\. Docker Compose

Define and run multi-container apps with one file.
**docker-compose.yml**

```
services:
  api:
    build: .
    container_name: my-node-app
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    env_file:
      - .env
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: appdb
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin"]
      interval: 5s
      retries: 5

volumes:
  pgdata:
```

**Commands**

```
docker compose up                  # start (foreground)
docker compose up -d               # start in background
docker compose up -d --build       # rebuild and start
docker compose ps                  # status
docker compose logs -f api         # follow logs of a service
docker compose exec api sh         # shell into a service
docker compose run --rm api npm test
docker compose stop                # stop
docker compose start               # start again
docker compose restart
docker compose down                # stop + remove containers/network
docker compose down -v             # also delete volumes (⚠️ data loss)
docker compose config              # validate config
docker compose pull                # pull latest images
docker compose -f docker-compose.prod.yml up -d
```

> To scale (`docker compose up -d --scale api=3`), remove `container_name` and the fixed host port first.

---

## 15\. Docker Hub & GitHub Container Registry

### Docker Hub

```
docker login
docker tag my-node-app yourusername/my-node-app:1.0
docker push yourusername/my-node-app:1.0
docker pull yourusername/my-node-app:1.0
```

### GitHub Container Registry (GHCR)

Create a Personal Access Token with `write:packages` scope, then:

```
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
docker tag my-node-app ghcr.io/your-github-username/my-node-app:1.0
docker push ghcr.io/your-github-username/my-node-app:1.0
```

**Tag format:** `registry/namespace/repository:tag` → `ghcr.io/john/api:2.3.1`

---

## 16\. Multi\-Stage Builds

Build with all tools, ship only what's needed → smaller and safer images.

```
# ---------- Stage 1: build ----------
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build            # outputs to /app/dist

# ---------- Stage 2: run ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=builder /app/dist ./dist
USER node
EXPOSE 8080
CMD ["node", "dist/server.js"]
```

**Static frontend (React/Vite) with Nginx**

```
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 17\. Healthchecks\, Restart Policies & Limits

**Healthcheck (in Dockerfile)**

```
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:8080/health || exit 1
```

`docker ps` will show `(healthy)` or `(unhealthy)`.
**Restart policies**

| Policy           | Behavior                                     |
| ---------------- | -------------------------------------------- |
| `no`             | Never restart (default)                      |
| `on-failure[:N]` | Restart on non-zero exit, optionally N times |
| `always`         | Always restart                               |
| `unless-stopped` | Always, unless you stopped it manually       |

**Resource limits**

```
docker run -d --memory=512m --cpus=1.5 --pids-limit=200 my-node-app
docker update --memory=1g --cpus=2 my-container
```

---

## 18\. Debugging & Troubleshooting

```
docker ps -a                                       # check STATUS / exit code
docker logs my-container                           # read errors
docker run -it --rm --entrypoint sh my-node-app    # shell instead of the app
docker inspect my-container
docker events
docker system df
```

**Exit codes**

| Code  | Meaning                                              |
| ----- | ---------------------------------------------------- |
| `0`   | Finished normally (your CMD ended)                   |
| `1`   | Application error                                    |
| `125` | `docker run` itself failed                           |
| `126` | Command not executable                               |
| `127` | Command not found (e.g. `bash` on Alpine → use `sh`) |
| `137` | Killed (out of memory or `docker kill`)              |
| `143` | Stopped with SIGTERM (`docker stop`)                 |

**Common problems**

| Problem                             | Fix                                                       |
| ----------------------------------- | --------------------------------------------------------- |
| `port is already allocated`         | Use another host port: `-p 3001:8080`                     |
| Browser can't reach app             | App must listen on `0.0.0.0`; check `-p`                  |
| `permission denied ... docker.sock` | `sudo usermod -aG docker $USER`, re-login                 |
| `no space left on device`           | `docker system prune -a`                                  |
| Code changes not showing            | Rebuild: `docker build --no-cache` / `compose up --build` |
| `exec format error` on `.sh`        | Convert Windows CRLF to LF; or wrong CPU architecture     |

---

## 19\. Cleanup

```
docker container prune              # stopped containers
docker image prune -a               # unused images
docker volume prune                 # unused volumes (⚠️ data)
docker network prune                # unused networks
docker builder prune                # build cache
docker system prune                 # most unused stuff
docker system prune -a --volumes    # EVERYTHING unused (⚠️)
docker rm -f $(docker ps -aq)       # remove all containers (Linux/macOS)
```

---

## 20\. Security Best Practices

- ✅ Use small, official, **pinned** base images (`node:20-alpine`, not `latest`)
- ✅ Run as a **non-root** user (`USER node`)
- ✅ Keep secrets out of images; add `.env` to `.dockerignore`
- ✅ Use **multi-stage builds**
- ✅ Scan images:

  ```
  docker scout quickview my-node-app
  docker scout cves my-node-app

  ```

- ✅ Harden at runtime:

  ```
  docker run --read-only --tmpfs /tmp \
    --cap-drop ALL --security-opt no-new-privileges my-node-app

  ```

- ✅ Rebuild regularly to get security patches

---

## 21\. Advanced Topics

### BuildKit cache mounts (faster installs)

```
# syntax=docker/dockerfile:1
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev
```

### Build secrets (not saved in any layer)

```
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci
```

```
docker build --secret id=npmrc,src=$HOME/.npmrc -t my-node-app .
```

### Multi-platform images (amd64 + arm64)

```
docker buildx create --use --name multi
docker buildx build --platform linux/amd64,linux/arm64 \
  -t yourusername/my-node-app:1.0 --push .
```

### Remote Docker hosts (contexts)

```
docker context create remote --docker "host=ssh://user@server"
docker context use remote
docker context use default
```

### Docker Swarm (built-in orchestration)

```
docker swarm init
docker stack deploy -c docker-compose.yml mystack
docker service ls
docker service scale mystack_api=5
docker stack rm mystack
```

For large production clusters, **Kubernetes** is the usual next step.

### Custom output formatting

```
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
docker images --format "{{.Repository}}:{{.Tag}}  {{.Size}}"
```

---

## 22\. CI/CD: Build & Push with GitHub Actions

Create `.github/workflows/docker.yml`:

```
name: Build and Push Docker Image

on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4

      - uses: docker/setup-buildx-action@v3

      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - uses: docker/metadata-action@v5
        id: meta
        with:
          images: ghcr.io/${{ github.repository }}

      - uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

Every push to `main` now builds the image and pushes it to `ghcr.io/<owner>/<repo>`.

---

## 23\. Git & GitHub Commands

### First-time setup

```
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git config --list
```

### Push this project to a new GitHub repo

```
git init
git add .
git commit -m "Initial commit: Dockerized Node app"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

### Everyday workflow

```
git status                 # what changed
git add <file>             # stage a file
git add .                  # stage everything
git commit -m "message"    # save a snapshot
git push                   # upload to GitHub
git pull                   # download + merge latest changes
git log --oneline --graph  # history
git diff                   # unstaged changes
git diff --staged          # staged changes
```

### Clone

```
git clone https://github.com/<username>/<repo>.git
git clone git@github.com:<username>/<repo>.git   # SSH
```

### Branches

```
git branch                     # list
git branch feature-x           # create
git switch feature-x           # switch  (older: git checkout feature-x)
git switch -c feature-x        # create + switch
git merge feature-x            # merge into current branch
git branch -d feature-x        # delete local branch
git push origin feature-x      # push branch
git push origin --delete feature-x   # delete remote branch
```

### Remotes

```
git remote -v
git remote add origin <url>
git remote set-url origin <new-url>
git fetch origin
```

### Undo & fix

```
git restore <file>             # discard local changes to a file
git restore --staged <file>    # unstage
git commit --amend             # edit last commit (before pushing)
git reset --soft HEAD~1        # undo last commit, keep changes staged
git reset --hard HEAD~1        # ⚠️ undo last commit and DELETE changes
git revert <commit>            # new commit that undoes a pushed commit (safe)
```

### Stash

```
git stash          # save work temporarily
git stash list
git stash pop      # restore it
```

### Tags (releases)

```
git tag v1.0.0
git push origin v1.0.0
git push origin --tags
```

### Rebase

```
git pull --rebase origin main   # update branch with a linear history
git rebase main                 # replay your branch on top of main
```

### SSH key for GitHub

```
ssh-keygen -t ed25519 -C "you@example.com"
cat ~/.ssh/id_ed25519.pub     # copy → GitHub → Settings → SSH and GPG keys
ssh -T git@github.com         # test
```

### GitHub CLI (`gh`)

```
gh auth login
gh repo create my-node-app --public --source=. --push
gh pr create --title "Add Docker support" --body "Dockerfile + compose"
gh pr list
gh pr checkout 12
gh pr merge 12 --squash
gh issue create --title "Bug" --body "Details"
gh issue list
gh run list            # GitHub Actions runs
gh run watch
gh release create v1.0.0 --generate-notes
```

### Recommended `.gitignore`

```
node_modules/
.env
dist/
coverage/
npm-debug.log*
.DS_Store
```

---

## 24\. Docker Cheat Sheet

| Task             | Command                                                      |
| ---------------- | ------------------------------------------------------------ |
| Build            | `docker build -t my-node-app .`                              |
| Run              | `docker run -d --name my-container -p 8080:8080 my-node-app` |
| List running     | `docker ps`                                                  |
| List all         | `docker ps -a`                                               |
| List images      | `docker images`                                              |
| Logs             | `docker logs -f my-container`                                |
| Shell inside     | `docker exec -it my-container sh`                            |
| Stop / Start     | `docker stop my-container` / `docker start my-container`     |
| Remove container | `docker rm -f my-container`                                  |
| Remove image     | `docker rmi my-node-app`                                     |
| Inspect          | `docker inspect my-container`                                |
| Stats            | `docker stats`                                               |
| Copy file        | `docker cp my-container:/app/file ./file`                    |
| Push             | `docker push user/my-node-app:1.0`                           |
| Compose up       | `docker compose up -d --build`                               |
| Compose logs     | `docker compose logs -f`                                     |
| Compose down     | `docker compose down`                                        |
| Clean all        | `docker system prune -a`                                     |

---

## 📚 Resources

- [Docker Docs](https://docs.docker.com/)
- [Dockerfile Reference](https://docs.docker.com/reference/dockerfile/)
- [Compose File Reference](https://docs.docker.com/reference/compose-file/)
- [Docker Hub](https://hub.docker.com/)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub CLI Manual](https://cli.github.com/manual/)

---

⭐ If this guide helped you, give the repo a star!
