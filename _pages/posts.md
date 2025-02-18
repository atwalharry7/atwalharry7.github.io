---
layout: default
title: Blog Posts
permalink: /posts/
---

# Blog Posts

{% for post in site.posts %}
  <article class="post-preview">
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <p class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</p>
    {% if post.description %}
      <p class="post-description">{{ post.description }}</p>
    {% endif %}
  </article>
{% endfor %}