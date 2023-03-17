#!make
docker-build: ## Builds docker
	docker build -t ml:latest -f docker/Dockerfile .

docker-compose-up: ## Runs docker compose up
	docker-compose -f docker/docker-compose.yml -p ml_container up

docker-compose-build: ## Runs docker compose build
	docker-compose -f docker/docker-compose.yml -p ml_container build

docker-run: ## Runs docker container
	docker run -d --name ml_container -p 6000:6000 ml

docker-stop: ## Stops docker container 
	docker stop ml_container

docker-rm: ## Stops and removes docker container 
	docker stop ml_container
	docker rm ml_container

docker-rm-bg: ## Stops and removes docker container in the background
	(docker stop ml_container > /dev/null && docker rm ml_container > /dev/null) &