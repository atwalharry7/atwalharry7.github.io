# Ruby >= 3.2 removed the taint APIs that Liquid 4 (pinned by github-pages / Jekyll 3.x)
# still calls. Defines them as no-ops. Loaded first via the Gemfile `require:` list, so it
# applies to both `bundle exec jekyll` on the host and inside the Docker image.
unless Object.method_defined?(:tainted?)
  class Object
    def tainted? = false
    def taint = self
    def untaint = self
    def trust = self
    def untrust = self
    def untrusted? = false
  end
end
