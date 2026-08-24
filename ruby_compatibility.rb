# Ruby 3.2+ compatibility patch for older Liquid/Jekyll versions.
# In Ruby 3.2+, Object#tainted?, Object#taint, and Object#untaint were completely removed.
# This patch defines them as safe no-ops to prevent legacy gems from crashing.

unless Object.method_defined?(:tainted?)
  class Object
    def tainted?
      false
    end
  end
end

unless Object.method_defined?(:taint)
  class Object
    def taint
      self
    end
  end
end

unless Object.method_defined?(:untaint)
  class Object
    def untaint
      self
    end
  end
end
