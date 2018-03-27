build:
	docker-compose build
run:
	docker-compose pull
	docker-compose up -d --build
	docker-compose stop jenkinsnodeslave
	docker-compose rm -f jenkinsnodeslave
clean:
	docker-compose down
clean-volume:
	docker-compose down -v


build-swarm:
	docker-compose build --compose-file docker-compose.swarm.yml
run-swarm:
	docker stack deploy --compose-file docker-compose.swarm.yml docker_services
push-swarm:
	docker-compose -f docker-compose.swarm.yml push
