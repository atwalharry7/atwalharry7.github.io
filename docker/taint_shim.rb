# Local-preview shim: Ruby >= 3.2 removed taint APIs that Liquid 4 (pinned by Jekyll 3.9) still calls.
# Loaded via RUBYOPT in docker-compose.yml; not used by GitHub Pages.
class Object
  def tainted?; false; end
  def taint; self; end
  def untaint; self; end
  def trust; self; end
  def untrust; self; end
  def untrusted?; false; end
end
