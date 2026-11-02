# Common commands (run inside Docker; see docker-compose.yml)
.PHONY: build_site run_local down all

build_site:
	docker compose run --rm jekyll bundle exec jekyll build

run_local:
	docker compose up --build

down:
	docker compose down

all: build_site run_local
