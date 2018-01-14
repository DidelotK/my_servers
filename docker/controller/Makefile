run:
	docker-compose pull
	docker-compose up -d --build
	docker-compose stop jenkinsnodeslave
	docker-compose rm -f jenkinsnodeslave
clean:
	docker-compose down

clean-volume:
	docker-compose down -v
