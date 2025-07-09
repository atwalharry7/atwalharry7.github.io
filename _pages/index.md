---
layout: default
title: "Harry Atwal"
permalink: /
---

<section id="home">

# Harry Atwal

Welcome to my personal website! I am a passionate machine learning researcher with a keen interest in developing innovative solutions to complex problems. Here, you can find information about my projects, my resume, and my contact details.

This site will also serve as a platform for me to share my thoughts on various topics related to machine learning and artificial intelligence. Sometimes I will write about things that have nothing to do with machine learning or AI. I'm a father, husband, and human being after. I enjoy mountain biking, consider myself a tinker (both electronics and woodworking), and love to cook.

</section>

<section id="about">

## About Me

I am a machine learning researcher with experience in various domains including natural language processing, computer vision, and reinforcement learning. My goal is to leverage machine learning techniques to create impactful and scalable solutions.

The last 7 years I've worked in machine vision projects that incorporate machine learning. I've worked on projects that range from simple object detection to complex image segmentation. I've also worked on projects that involve reinforcement learning and natural language processing. As a researcher at the University of North Carolina Wilmington, I was able to work on various projects that involved machine learning and computer vision.

</section>

<section id="blog">

## Blog

Here are some of my latest posts:

{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ post.url | relative_url }}) <small>{{ post.date | date: "%B %d, %Y" }}</small>
{% endfor %}

</section>

<section id="resume">

## Resume

You can view my resume [here](/content/AtwalH-Modern2024.pdf).

</section>

<section id="contact">

## Contact

Feel free to reach out to me at [harry@harryatwal.com](mailto:harry@harryatwal.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/harry-atwal-6951696b/).

Thank you for visiting my website!

</section>
