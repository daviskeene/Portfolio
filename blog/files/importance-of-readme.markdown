title: The Importance of a Good README
author: Davis Keene
description: How a well-written README can make your project more successful.
path: importance-of-readme
date: May 17th, 2020
categories: git style
---
## _Developers are very good at writing code, and very bad at reading it._ 
In a developer's pursuit of success, they'll often cut corners, write non-idiomatic snippets of code only they can understand
and go at great lengths to search for the one _true_ answer in Stack Overflow. When all of this is
said and done, and their projects are ready to be deployed or put on their resume, something is often
overlooked that can change the way a future employer reacts to their code: the README.md.

Assuming you have used GitHub as a version control source before, you'll know that a README is a specific markdown file that goes in the
root directory of your project. Many repositories are initialized with a README, with just the project's GitHub title and description, and 
this is seemingly good enough for many programmers. However, taking an extra 15-20 minutes to craft a well-designed README will save people
looking at your project a lot of time, which can make or break how effective your project is as a recruiting utility.

## Why make good README's?
Put yourself in the shoes of an employer or colleague trying to look at some of your public repositories. Your resume or CV may have included
your GitHub repository link, and perhaps your employer is looking to see if you have any experience working with the Django REST Framework.
A repository catches their eye, and they click it, only to see this:
![An example of a bad readme](../assets/images/readme/no-readme.png)

In this example, I'm using one of my own repositories as a case study. While I was in a job interview, rather than have a
detailed README with screenshots, gifs and API documentation, I had to boot up the project and show them everything myself. Luckily,
it all worked out in the end (thanks [jellyfish](https://jellyfish.co)), but I could have saved them the effort by just taking a half an hour
to detail everything in my README.

Imagine an alternate scenario, where an employer is looking at your GitHub and finds all of your README's empty. What do you think is more likely?
- a) They read through your code line-by-line and try to get a better understanding of your coding process.
- b) They hardly read any of your code, missing important work that you wanted to showcase.

In most cases, (b) is the more popular choice. Having a good readme is like laminating your resume at a career fair: it might not seem significant,
but it helps you stand out.

Another reason to make a good README is to <b>make your good code stand out</b>. You can showcase your
accomplishments and highlight things you're proud of without having to go too deep into the implementation.

## What is an example of a good README?
To make a good README, I'll often either template my own based on my project's context or use this [wonderful](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2) template on github.
To continue with the case study of my Job Board project, I'll try to update my new README using this template.

After following the template, our new README looks like [this](https://github.com/daviskeene/startup-job-board/blob/master/README.md):
![New readme](../assets/images/readme/new-readme.png)

Now, if someone wants to run the API on their own machine, or if they just want to learn more about the project without
being forced to look through the code, they can! Markdown is a very easy styling language to learn (it's what's being used to 
write these posts), and once you get familiar working with the structure of a good README your projects will get more recognition and
be able to do more for you.

## Closing Remarks
Every single programmer that I know that has used GitHub knows that the README is often overlooked. After spending hours, days, and even weeks
into creating your personal or professional projects, it's often seen as trivial to write about it and document it for people that aren't you. Of course,
_you_ know how your code works, but that doesn't mean that other people will too.

It's important to document your code thoroughly by writing appropriate comments and making your code readable, but you can _never_ get a first impression back.
The README is the face of your github repository, and by making it detailed, you're much more likely to get positive feedback.

## [Back to Home](https://daviskeene.com/blog/)