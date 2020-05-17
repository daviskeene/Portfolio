title: Privacy First Contact Tracing, in Layman's Terms
author: Davis Keene
description: In order to re-open the economy in the fastest and least-damaging way possible, contact tracing applications will play a huge roll. But how do these apps work, and how do they protect our personal information?
path: laymans-contact-tracing
date: May 17th, 2020
categories: security coronavirus cryptography
---
## _"People fear what they don't understand and hate what they can't conquer."_- Andrew Smith

When the coronavirus pandemic hit America in early 2020, privacy was one of the least important things to American citizens at the time.
Staying inside, buying enough toilet paper and washing your hands were the biggest concerns for people who hadn't yet contracted the virus.

And yet, as we begin to turn the seasonal corner from spring to summer, the one question on everyone's minds remains the same: When, and how, are
we going to re-open the economy safely and swiftly? I think that privacy first solutions, namely anonymous contact tracing applications, are the obvious solution.

## What is Contact Tracing?
I rather dislike the mainstream name for this technology being "contact tracing", because to trace something often implies that your locational data
is compromised or used in any way. The goal of this tracing is to contain the virus more quickly by alerting people when they have been in sustained contact
with a person who has tested positive for the virus. The end result of this is stopping infections before they happen, which allows the economy to re-open and
for states to ease restrictions while hospitals can operate at below-full capacity.

![Diagram of Contact Tracing](../assets/images/laymans/tracing-diagram.png)

## Why do we need contact tracing?
The coronavirus, from what we know, is unique in that is has an [extremely long incubation period](https://www.cdc.gov/coronavirus/2019-ncov/hcp/clinical-guidance-management-patients.html).
This means that people who have been infected with the virus may not show symptoms for 14 days, by which point they've been infecting other people without even knowing it. To the virus, there
are 4 kinds of people: those who haven't been infected, those who have been infected and are infecting others, those who have been infected and are in quarantine, and those who have had the coronavirus
and cannot receive it / transmit it anymore (either because they have recovered or died).

One of the biggest challenges is knowing when a person should begin to self-quarantine to prevent the spread of the virus. And the most effective method is by telling people when they have been exposed to a COVID-19
positive person. As of right now, it's advised by the CDC to contact people that you've been in proximity with should you receive a positive diagnosis, but that means that you're only notifying people you personally know. What about
random people you've come in contact with?

By having contact tracing applications in people's phones, we can safely and effectively see when people came into contact with COVID-19 positive patients, notify them promptly, and lower the rate of infection.

## Doesn't this mean the app needs to know where I am?
It's easy to think that a contact tracing app consists of knowing your location and knowing the location of everyone around you. In this model, your phone would
keep a record of where you've been and when, and then if a person tests positive for COVID-19 their location data is uploaded to a server.

<b>This is not how contact tracing apps work!</b> If it were, it would be a serious invasion of privacy. Not to say that companies
 like Google or TikTok aren't already [using your location data](https://www.cnet.com/news/tiktok-accused-of-secretly-gathering-user-data-and-sending-it-to-china/), but
 we shouldn't have to give up our privacy or face viral doom. The good news is, <b>we don't need to choose!</b>
 
## Privacy First Contact Tracing, in Layman's Terms
Rather than know where you've been, all your phone needs to know is <i>who you've been around</i>.

Privacy first contact tracing apps accomplish this by doing two things: sending out random messages, and receiving random messages from other nearby phones.
By having my phone store the messages it sends out, and the messages it takes in from nearby people, I can have my app search nearby hospital databases containing 
messages that were sent from <i>COVID-19 positive people</i>. If my list of received messages contains any of the messages in the database, it means I was recently in contact with someone 
who tested for COVID-19, and I should self quarantine for 14 days.

This graphic from [Nicky Case](https://ncase.me/) does a great job at illustrating how this works, following the story of two people named Alice and Bob:
![Nicky Case's drawing showing how DP3T works.](../assets/images/laymans/dp3t-diagram.jpg)

Using this type of contact tracing, personal information is protected and people are able to self quarantine earlier, resulting in fewer infections.

## Closing Remarks
When I first heard about contact tracing, I admit that I had the same fears as many Americans: I don't want to compromise my privacy to keep me safe. But with anonymized, privacy-first contact
tracing solutions, it is possible to protect personal information while keeping people safe. [DP3T](https://github.com/DP-3T/documents/blob/master/DP3T%20White%20Paper.pdf), the algorithm I just described, is all
open source, so the investigative minds among you can look and see how these random messages are generated and how Bluetooth and other phone services are used to store and send messages. 

The most important thing is to spread this information, and make sure that people are willing to download privacy first contact tracing applications in the first place. This only works if enough people are
involved, and misinformation about this topic exists everywhere today. The same people who believe that [bill gates caused the virus to promote mass vaccination](https://www.forbes.com/sites/brucelee/2020/04/19/bill-gates-is-now-a-target-of-covid-19-coronavirus-conspiracy-theories/#787a0d6b6227)
are the same ones that have these massive privacy concerns.
 
Hopefully, the use of contact tracing apps will be a huge driving force in the re-opening of the national economy, and allow us to return to a better, more active lifestyle sooner than we thought.
 
### [Back to Home](https://daviskeene.com/blog/)