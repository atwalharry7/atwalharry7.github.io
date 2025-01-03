---
layout: default
title: Blog
permalink: /blog
---

## My Blog Posts

<ul>
  Archive: 
  {% for post in site.posts.old_posts %}
  <li><a href="{{ post.url }}" class="post-preview">{{ post.title }}</a></li>
  {% endfor %}

  New Posts
  {% for post in site.posts %}
  <li><a href="{{ post.url }}" class="post-preview">{{ post.title }}</a></li>
  {% endfor %}
</ul>