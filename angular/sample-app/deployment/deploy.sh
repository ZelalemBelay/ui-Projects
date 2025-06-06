#!/bin/bash

# Install Docker if needed
if ! command -v docker &> /dev/null; then
  sudo yum update -y
  sudo yum install -y docker
  sudo systemctl start docker
  sudo systemctl enable docker
fi

# Add user to docker group
sudo usermod -aG docker ec2-user

# Install Docker Compose plugin (v2)
if ! docker compose version &> /dev/null; then
  DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
  mkdir -p $DOCKER_CONFIG/cli-plugins
  curl -SL https://github.com/docker/compose/releases/download/v2.27.1/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
  chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
fi

# Relaunch shell with docker group permissions
newgrp docker << END
  docker compose down || true
  docker compose up -d --build
END
