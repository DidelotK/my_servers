build:
	docker-compose build
run:
	docker-compose pull
	docker-compose up -d --build
	docker-compose stop jenkinsnodeslave
	docker-compose rm -f jenkinsnodeslave
run-swarm:
	docker stack deploy --compose-file docker-compose.swarm.yml docker_services
clean:
	docker-compose down

clean-volume:
	docker-compose down -v
push:
	docker-compose -f docker-compose.swarm.yml push
