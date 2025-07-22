# Common commands
build_site:
	bundle exec jekyll build

run_local:
	bundle exec jekyll serve --watch 

all: build_site run_local