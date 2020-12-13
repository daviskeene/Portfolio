title: Creating Music Metrics and Modeling Artist Relationships with Spotify's API
author: Davis Keene
description: I love two things more than anything- music and computer science. Let's use Spotify's API to combine the two! Topics include Music Recommendation, Discography Ranking, creating a Graph of Related Artists, finding the shortest path between two artists, & more!
path: spotify-data
date: December 12, 2020
categories: productivity music data-science
---

## _"Music can change the world."_ - Beethoven

<div style="text-align: left">
<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1EM6e5Tlc78VFE" width="250" height="480" frameborder="0" allowtransparency="true" allow="encrypted-media" align="right" style="margin-left: 25px; box-shadow: 10px 10px #FF91AF;">
</iframe>
<span>If you're anything like me, then you listen to music constantly. I have logged over 75,000 hours on Spotify this year alone, listening to all types of music. My favorite genres are mostly
indie, R&B, and alt-rock, but I'd say that I have a fairly diverse taste in music. To the right is my Spotify Top 100 songs, feel free to check them out!
</span>
</div>

As a long time Spotify user, I've noticed a few things about the platform that have been changing. Spotify has become **much** more than a streaming service. Now, it gives you
recommendations for what songs you might like, automatically creates playlists each day for you to listen to, hosts podcasts, has Artist metrics that you can use to determine their
overall popularity, the list goes _on and on_.

As a Statistics and Computer Science student at UIUC, I love working with data that I can visualize. Spotify's music data is no exception. Wouldn't it be cool to see unique song metrics that you
can hear in the music? What if you could create custom metrics that would tell you how likely you are to like a particular song?

I had these questions and more not too long ago. And so, I set out on a quest to answer the following questions:
1. Given any random song, what's the likelihood that I'll like it?
2. Given a discography, can I rank the songs from most likely to enjoy to least?
3. Can I model Spotify Artists as a weighted graph?
    -   Can I determine the smallest number of intermediate artists between any two artists on Spotify?
    -   How can we traverse artists by genre?

After many cups of coffee and many more lines of code, I think I've come up with lots of surprising results. And by the way... <h2>**If you're reading this and work at Spotify, I need a job for this summer!**</h2>


<h1 style="color: #FF91AF"> <u>Problem 1: Computing the Likelihood of Enjoying a Track</u> </h1>
## Gathering the Data

To get all the data that we need for these insights, we're going to be using the Spotify Web API and its python wrapper module, `Spotipy`.

Spotify's API can allow you to do _just about_ everything that you could in the desktop app. You can make playlists, like songs, get artist information, etc. We can also gather additional
statistics that aren't exposed publically through the Spotify desktop application. What other properties could Spotify have about songs that aren't its genre, duration, and tempo? What else are they hiding?

### The Echo Nest and Song Metrics

In 2014, Spotify acquired the Echo Nest, a small company in the Greater Boston Area that was working on a dynamic music classification algorithm. The engineers on the team created a set of
song metrics that are unique to each song and are generated from a track's waveform. Some example of these new song metrics are:
1. Speechiness: A number between 0 and 1 that predicts how likely it is that this track contains only speech.
2. Danceability: A number between 0 and 1 that predicts how likely it is that a person would be able to dance to this track.
3. Energy: A number between 0 and 1 that describes how "energetic" this track is.

There are a few others that I won't mention now, but you get the point. Every song on spotify has a unique set of these features that we can obtain by using its API. The only thing left to wonder is: what can we do with these features?

Let's create a new metric, just like the ones above, called `likeability`. This number is unique per song per _user_, and describes how likely we are to enjoy a track given our previous
listening history. How would we go about finding this number?

To start, we would need to know what our current music taste is. Then, we'd compare the features of our recent listening history to that of a given song to get a distance measure of how far this song is from our ideal music taste. Finally, we would map this value between 0 and 1 so that we can interpret it as a likelihood. Let's get started.

### Getting our Recent Listening History

As it turns out, Spotify allows us to get a ranked list of all of our top songs over three different time ranges: _short, medium, and long_. Let's download all of my top tracks over a short timeframe, and pull all of
these tracks' metrics and additional information:

<center>
<img src="../assets/images/spotify/Screen Shot 2020-12-12 at 9.50.03 PM.png" width="850" height="400" />

<i>My recent listening history and each tracks' song metrics.</i>
</center>

Now that we have our recent listening history, we want to get a sense of what our _ideal_ feature values are for a song. To do so, we can take a weighted average across all
our songs' metrics to get a vector that represents our ideal song metric values.

<center>
<img src="../assets/images/spotify/Screen Shot 2020-12-12 at 10.05.46 PM.png" width="300" height="120" />

<i>A weighted average of all the song metrics in my recent listening history. These represent my "ideal" values for each metric.</i>
</center>

### The Likelihood Function

We'll define the likelihood function like so:

<center>
<img src="../assets/images/spotify/Screen Shot 2020-12-12 at 10.18.24 PM.png" width="250" height="100" />

<i>The likelihood function that computes our 'likeability'. We're using a gaussian distribution with custom parameters, as it is a strictly decreasing function over the interval [0, inf).</i>
</center>
where _Aplha_ is calculated by summing the unsigned z-scores across all **m** features in our song, and _Beta_ is a pre-defined constant that scales our function.
In this sense, alpha is the total number of the standard deviations away that any one song is from our ideal metric values.

<center>
<img src="../assets/images/spotify/Screen Shot 2020-12-12 at 10.13.13 PM.png" width="325" height="100" />

<i>Alpha is calculated by adding up all the z-scores across m features.</i>
</center>
The smaller the value for alpha, the fewer standard deviations away this song is from our ideal feature values, and therefore we are more likely to enjoy this song. We could also use other measures of distance, too: for example, the dot product between the "ideal" values vector and another tracks' vector will give some measure of similarity. As would the cartesian distance between these points in **m**-d space. After a few iterations, I settled for z-score sum, because it actually gave me the most anticipated results.

### Results
After finding the standard deviations for all **m** features, I decided to feed a random song into my algo to see the output. The value for _Beta_ used for the likelihood function is 8.5.

<center>
<img src="../assets/images/spotify/Screen Shot 2020-12-12 at 10.32.16 PM.png" width="350" height="75" />

<i>We have a 70% chance of enjoying MGMT's Electric Feel!</i>
</center>

##### NOTE: Beta = 8.5 is only half arbitrary. It was calculated by finding the value for beta such that the point of inflection on the graph would be roughly at x=m.

For fun, I also decided that I could compute the likeability for the US Top 50 songs to see which ones I would most enjoy.

<center>
<img src="../assets/images/spotify/Screen Shot 2020-12-12 at 10.37.51 PM.png" width="500" height="275" />

<i>US Top 50 Songs as of 12/12/2020, ranked by likeability.</i>
</center>

<h1 style="color: #FF91AF"> <u>Problem 2: Ranking an Artists' Discography</u> </h1>

The motivation behind this is as follows: Suppose you find a new artist on Spotify that you really like. You check out their aritst profile to see that they have about 50 songs.
Spotify gives you about 5-10 recommended songs for you to listen to, but these recommended songs are agnostic to the user. They are simply that artists' most popular songs of all time and
at the time.

What if, instead, when you visited an artists' page on Spotify, they gave you a list of songs from that artist that _you are most likely to enjoy_? Well, that's where our algorithm comes in!

I made a small tool called [Artistly](https://github.com/daviskeene/Artistly) that generates ranked discographies for artists using Spotify OAuth and Django. I may try to deploy this in the future, but
for now you can check out the code and play around with the app using the link to the Git repo.

Here's an example:
<center>
<img src="../assets/images/spotify/Screen Shot 2020-12-12 at 11.02.15 PM.png" width="500" height="500" />

<i>A discography of Still Woozy, ranked by likeability.</i>
</center>

<h1 style="color: #FF91AF"> <u>Problem 3: Modeling Related Artists as a Weighted Graph</u> </h1>

I took a data structures class this past semester that had us learn about lots of different graph traversal and path finding algorithms. While playing around with the
Spotify API (and from using the product), I noticed that all artists are given a list of artists that they're related to. These relations are typically defined by genre, and
it's used mainly for artist discovery in the Spotify web app.

I had the idea to model this graph of related artists as a weighted network graph, and perform some of the aforementioned algorithms on the graph to get a better picture for
how artists are related in Spotify's internal network.

Artists on Spotify are related by their genres, and what listeners of one artist are also listening to. I'm not sure how
related ariststs are actually calculated, but I do know that every artist has related artists. In this way, we can imagine
Spotify Related Artists as a Network Graph, with edges that connect artists of a similar genre.

All of the code (and most of the following text) can be found <a style="font-size: 21px; font-weight: bold;" href="https://github.com/daviskeene/ArtistGraph">here</a>.

## Loading the Data
The code for most of this was done in C++, and the data was again pulled from the Spotify API. I wrote some python code to pull artist and related artist data into a CSV,
and I read this CSV when creating an `ArtistGraph` instance.

This data is parsed by `CSVReader`, a class that I had to create in order to read artist data. This `CSVReader` contains generic methods for parsing any type of CSV,
and methods that are specifically designed to pull artist data based on the format of the data.

`ArtistGraph` is a sub-class of `Graph`, which has code to obtain Vertex and Edge information. `ArtistGraph` contains methods and constructors that are used to carry out the algorithms below.
The edges of an ArtistGraph are weighted based on the number of different genres between two artists (so, if two artists have many genres in common, they will be 'closer' than
artists with many genres that differ).

## Algorithms
Now that I have the data loaded, I can do things with it! Here are a few of the algorithms implemented in `ArtistGraph.cpp`:

1. Djikstra's Algorithm for computing the shortest path between two artists.
2. Betweenness Centrality for finding the number of shortest paths that pass between nodes (to determine musical diversity and connections).
3. A Breadth First Search of the Graph to traverse similar artists first, and then slowly traverse the graph to artists of increasingly different genres.
4. The Floyd-Warshall shortest distance algorithm to compute the shortest distance between any two artists in the graph.

### Finding the Shortest Path between Two Artists
After loading the data into the graph, we can display the shortest path between two artists.

Here's an example of the shortest path from Future to Kid Cudi:
```
Future -> Meek Mill -> Big Sean -> Kanye West -> Kid Cudi
```

The actual path computation uses Djikstra's algorithm to traverse the graph to find the path, and pushes Vertexes into a lookup table to see its previously
visited Vertex. Once we reach the terminal node, we simply return a vector that backwards - traverses the previously visited nodes until we reach the start node.

This gets us the number of artists that separate one artist from another. But remember: we also weighted our edges by the number of different genres between artists.
What if I want to get the shortest distance between two artists in linear time?

### Floyd-Warshall Matrix

The Floyd-Warshall matrix is an n x n matrix, where n is the number of artists in the graph. Each row and column represents an artist in the graph. The value of the
matrix at (i, j) is the value of the shortest distance between artist i and artist j. I can visualize our networks' distances by creating a heatmap:

<center>
<img src="../assets/images/spotify/Screen Shot 2020-12-12 at 11.16.53 PM.png" width="500" height="500" />

<i>A heatmap visualizing our Floyd-Warshall matrix. Each pixel at (i,j) represents the shortest distance between artist i and artist j. The brighter the color, the smaller the shortest path between two artists.</i>
</center>

You may notice that this is a perfectly symmetrical matrix along a line with slope -1, and this is due to the following property: the shortest path from artist A to artist B is the same as the shortest path from artist B to artist A.

The colors represent the value of the shortest distance between two vertexes. The distance, in this case, can be interpreted as the total number of different genres that separate two artists along
the shortest path between them. It's kind of an odd metric to measure distance by, but it makes sense in context.

The computation of this matrix can be found [here](https://github.com/daviskeene/ArtistGraph/tree/master/src) in `ArtistGraph.cpp:180`.

## Betweenness Centrality
Betweenness Centrality is a measure of how many times a node acts as a "bridge" between two points (ie. how many shortest paths run through that node).
To compute betweenness centrality, we first calculate the Floyd-Warshall matrix that contains the shortest distances between any two artists in our graph.

We can then use this matrix to determine _if_ a shortest path exists between any two nodes. If it does, then we calculate the shortest path and loop through all nodes along that path, storing a map that relates these vertices to a custom struct that stores an artists name and their centrality score.

A higher centrality score means that an artist is more "central" to the graph. Since they have more shortest paths running through them, we can interpret this as this artist having a diverse
enough list of genres / popular list of related artists.

Below is a printout of the centrality scores for each artist. The number next to the artists' name denotes the number of times this artist appears in
a shortest path between two other artists. Feel free to `Ctrl + F` for your favorite artist to see their centrality score! 

Here are the results:

<embed type="text/html" src="../assets/images/spotify/centrality.txt"  width="250" height="350">

As you can see, many popular artists are towards the top of the list, with OneRepublic dominating the competition. This result is expected, because popular artists are
more likely to have relations to other artists from other genres. You'll also notice most of the genres of artists towards the top are pop, and this is most likely
due to the fact that pop has a blend of many other genres (rap, indie, rock, etc.) so it's easy to hop from these artists to others.

## Breadth First Traversal

When traversing a graph of related artists, it makes the most sense to traverse using a Breadth First Algorithm. This is because I want to slowly work
our way from one genre (or group of related artists) to another.

Let's start from _Kid Cudi_, and see where our graph takes us:

<embed type="text/html" src="../assets/images/spotify/cudi.txt"  width="250" height="350">

As you can see, the traversal starts with artists that are related to Kid Cudi, and has more rappers towards the top. As the list goes on, however,
we start to see other genres blending in. Eventually, we make it out of the rap genre and start to enter alt rock / indie, and start moving further and
further away from artists that are similar to what we started with.

## Concluding Remarks

All in all, it was rewarding to see results that were somewhat _expected_. To see that popular artists had high centrality scores, that the path between
similar artists follows a logical progression, and that the traversal groups artists together + slowly walks away from a starting genre was really cool.

Pretty soon I plan on getting more complicated visuals established for the graph: using a force directed graph visualization to actually view all of the nodes,
drawing out the shortest paths between artists, etc. More of that to come whenever I have free time!

### [Back to Home](../)