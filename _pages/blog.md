---
layout: default
title: Blog Posts
permalink: /posts/
---

# Blog Posts

<div class="blog-container">
{% assign posts_by_year = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}

{% for year in posts_by_year %}
  <div class="year-section">
    <h2 class="year-heading">{{ year.name }}</h2>
    <div class="posts-grid">
    {% for post in year.items %}
      <article class="post-card">
        <div class="post-card-content">
          <p class="post-meta">{{ post.date | date: "%B %-d" }}</p>
          <h3 class="post-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
          {% if post.description %}
            <p class="post-description">{{ post.description | truncate: 120 }}</p>
          {% endif %}
          {% if post.excerpt and post.description == nil %}
            <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 120 }}</p>
          {% endif %}
          {% if post.tags %}
            <div class="post-tags">
              {% for tag in post.tags limit:3 %}
                <span class="tag">{{ tag }}</span>
              {% endfor %}
            </div>
          {% endif %}
        </div>
      </article>
    {% endfor %}
    </div>
  </div>
{% endfor %}
</div>