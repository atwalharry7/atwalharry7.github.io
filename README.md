# harryatwal.com

Jekyll site (GitHub Pages theme `jekyll-theme-modernist`). The default way to build and preview it is Docker; running Ruby on your machine is supported as an alternative.

## Docker (default)

Requires Docker Desktop (or any Docker engine with Compose v2).

| Command | What it does |
| --- | --- |
| `make run_local` | Builds the image, starts Jekyll in watch mode and nginx. Open http://127.0.0.1:4001 |
| `make build_site` | One-off build into `./_site` (gitignored) |
| `make down` | Stops the containers |
| `make all` | `build_site`, then `run_local` |

How it works:

- `docker/Dockerfile` pins Ruby 3.3 and installs gems from `Gemfile.lock` at image build time. Gems stay in the image, not in the repo.
- `docker-compose.yml` runs `jekyll` (watches the repo and rebuilds on change) and `web` (nginx serving the build output on port 4001).
- `docker/nginx.conf` disables browser caching so CSS/JS edits show up on refresh.

After changing `Gemfile` or `Gemfile.lock`, rebuild the image with `docker compose build jekyll`.

## Local Ruby (alternative)

Use Ruby 3.3, which matches the Docker image. Other 3.x versions are untested.

```sh
bundle install
bundle exec jekyll serve
```

Then open http://127.0.0.1:4001. The port comes from `port:` in `_config.yml`.

## Notes

- `ruby_compatibility.rb` defines the Ruby taint methods that Liquid 4 still calls. It is loaded by the `Gemfile` `require:` list, so it applies to both local and Docker runs. GitHub Pages does not use it.
- Dependencies: `github-pages` 232 (the newest release). The lockfile has one known advisory that cannot be fixed without dropping github-pages: rubyzip 2.4.1 (CVE-2026-85396, path traversal, fixed in 3.4.0). Run `bundle-audit check --gemfile-lock Gemfile.lock` to see the current list.
