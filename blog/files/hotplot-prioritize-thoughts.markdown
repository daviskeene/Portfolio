title: The HotPlot- A Fun Way to Prioritize Ideas
author: Davis Keene
description: Everyone wants a way to prioritize their ideas and side projects, but doing so often feels tedious and unhelpful. Introducing the HotPlot, a way to organize your thoughts that feels right.
path: hotplot-prioritize-thoughts
date: July 8th, 2020
categories: productivity
---
## "Time isn't the main thing. It's the only thing. - Miles Davis"
If you're a developer, then I'm sure that you've experienced the same thing that I have: the guilt that comes from trying and not finishing
too many side projects. It seems that prioritizing these projects or other ideas is too daunting a task for many, and so we just decide to 
work on whatever we feel like in the moment. The problem here is that motivation is fickle; it isn't something that often persists for very long.
And so, we end up in a race against ourselves to finish a project before we lose motivation, or else it will never get done at all.

However, there are smart ways to tackle this issue. In the case of digital products, we can prioritize our ideas by being smart about how we compare them.
After recently starting work with Jellyfish in Boston, a co-worker of mine Thomas Whitehead introduced the concept of a HotPlot; a way of prioritizing ideas
that has sufficiently changed the way that I scope my next side project.

## Selecting Ideas Without Temporary Bias
There are many ways to prioritize things. In the context of digital products, the goal of a HotPlot™ is to reduce the amount of time it takes to arrive at a prioritized list of things, and increase the confidence that that list is correct. 
The framework itself is likely familiar to you. It’s based on a traditional prioritization matrix (sometimes called a decision matrix or Eisenhower matrix). These types of matrices have been used for decades in business, product, and even personal time management scenarios. But what makes a HotPlot™ a HotPlot™ is the process by which we arrive at a prioritized list. 
Let’s dig in. 

Below is a picture of the HotPlot itself: it's a prioritization matrix with two axes: **awesomeness** and **easiness**.

<center>
<img src="../assets/images/hotplot/hotplot-ranking.png" width="450" height="400" />
</center>

The process behind using a HotPlot to make informed decisions is straightforward:

1. Select a list of ideas.
2. For each idea, rank it in terms of its **awesomeness**. How awesome would it be to see this idea come to fruition?
3. Next, go back through the list of each idea, and rank them in terms of their **easiness**. What is the cognitive load required to complete this idea?
4. Now that you have your rankings, plot them on the chart.
5. Ideas farthest from the origin are the ones you should be prioritizing first. Here's an overlay that describes what that would look like:

<center>
<img src="../assets/images/hotplot/hotplot-scales.png" width="450" height="400" />
</center>

## An Example
For the experiential learner, let's go over a brief example. Suppose I'm working on the following 3 projects:
1. Machine Learning to predict when my alarm should go off any given day.
2. Re-make my website.
3. GitHub Profile Analyzer.

First, let's rank these ideas by their *awesomeness*.

- Machine learning alarm clock? Awesome. I would never have to set my alarm ever again! I'll give that a **9/10**.

- Re-making my website? Not super awesome. I already have a functional site, although a revamp may look nice. **5/10**.

- GitHub Profile Analyzer? It would be awesome to get a summary of my git events that's more in-depth than GitHub. **7.5/10**.

Next, let's rank them based on their *easiness*.

- Machine Learning Alarm Clock? This is hard! I would have to gather data, train a model, etc. In terms of easiness, **4/10**.

- Re-making personal website? Well, I already made one before, and it's easier than machine learning. So we'll say **7/10**.

- GitHub Profile Analyzer? All it really requires is GitHub API access and reading through the documentation, so it's pretty easy. **6/10**.

Now, let's see the plot!

<center>
<img src="../assets/images/hotplot/hotplot-example.png" width="800" height="500" />
</center>

Remember: it's the distance to the origin that decided which one we should prioritize. In a case like this,
our points appear to fall right around the same distance from the origin. We can compute the distances to give us a
ranked list:

<center>
<img src="../assets/images/hotplot/hotplot-example-2.png" width="400" height="90" />
</center>

So, it looks like we should pick between the ML Clock and the GitHub analyzer, and maybe put the website on the backburner.

## How To Make HotPlots Easily
Since I've been making these plots so frequently, I actually published a site to make them somewhat quickly. Check it out!

###[Make A Hotplot!](https://hotplotit.vercel.app)

## Closing Remarks
I hope that this was a helpful guide for people (like me) who struggle to prioritize ideas. It's easy to lose motivation in the software industry, as there are always distractions
that come up in life. The HotPlot has been a great tool for me to use to organize my thoughts, and make a list of things I should do *in order*, making it a lot
easier to hold myself accountable for lost time.

Even if the HotPlot isn't the right tool for you, I hope this encourages some internal dialogue as to what works best for YOU when organizing personal or work-related
projects. Half of being an engineer is having the skill set to accomplish anything; the other half is working efficiently, effectively, and passionately.

###[Back To Home](../)