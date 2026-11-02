FROM ruby:3.3-slim

# Native gem build tools; git is read by jekyll-github-metadata.
RUN apt-get update \
 && apt-get install -y --no-install-recommends build-essential git \
 && rm -rf /var/lib/apt/lists/*

# Gems live in the image, not in the bind-mounted repo (keeps vendor/ off the host).
ENV BUNDLE_PATH=/usr/local/bundle \
    BUNDLE_SILENCE_ROOT_WARNING=1

WORKDIR /srv/site

# Install from the lockfile at build time so `docker compose up` does not need to bundle.
COPY Gemfile Gemfile.lock ./
RUN bundle install
