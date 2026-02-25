up-dev:
	docker compose -f docker-compose-dev.yaml up

up-prod:
	docker compose -f docker-compose-prod.yaml up --build

up-dev-build:
	docker compose -f docker-compose-dev.yaml up --build


clear:
	docker rm 8inf886_projet_1-web
	docker rm 8inf886_projet_1-db
	docker rmi 8inf886_projet_1-nextjs

connect-bd:
	docker exec -it 8inf886_projet_1-db mysql -u root -ppassword projectDB