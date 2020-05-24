title: Cross Site Compiling, A Guide to Compiling Code Over the Web
author: Davis Keene
description: There are many popular websites online that let you use online compilers and interpreters to write code in your browser. Let's take a look at how these systems are designed, and how they're being used to provide a better computer science education.
path: cross-site-compiling
date: May 24, 2020
categories: misc kotlin
---
## <i>“Today, most software exists, not to solve a problem, but to interface with other software.”</i> — IO Angell
Last semester, I had the pleasure of taking [Joyful Kotlin](https://kotlin.cs.illinois.edu), a class at UIUC dedicated towards teaching Kotlin in a
fun new way. We learned how to make our own Web API's with Kotlin's [kTor](https://ktor.io/), parallelism and concurrency in Kotlin, and how Kotlin's null safety and
mutability rules make it a safe language for people to pick up to teach them about programming essentials. The one thing that this class was missing? Homework.
We had been promised homework problems throughout the year, but the coronavirus pandemic hindered the course staff's ability to work on a testing framework and an agreed upon system.
There was only one graded assignment in this class: the final project. And for my final project, I decided to make a homework service. This is how I approached compiling kotlin into java bytecode
over the web, and how I made dynamic interfaces to load homework assignments from the web.

## The Stack
Rather than use a web framework for this assignment, I chose to use vanilla JS and bootstrap to quickly prototype. The frontend shouldn't be main focus here, though. Since this was a
kotlin final project, I made the compiler service a Kotlin API with endpoints to modify, add or delete data in my Google Firestore instance (which stores users and assignments), and more importantly,
an endpoint that would accept an incoming kotlin file and return its output.
<center>
![](../assets/images/cross-site/Untitled%20Diagram.png)

A brief diagram of the api code compile flow.
</center>

## Running the Code
File upload API's are pretty standard for the web, but it's a different story to run an uploaded piece of code. More often than not, API's with this functionality are
battle tested by curious programmers to see if they can try and inject malicious code to cause the server to crash. And so, when designing these types of systems, one has to be mindful of who
will be running the code, enforcing that code is run with checks and balances, and returning the correct output.

But before you tackle any of the above... how on earth do you just run a script outside of an API process? I mean, the machine that's running the API doesn't know that the Kotlin code
exists at compile time. So how do you get the code to run at all? This is where bash scripts come in handy. Here's a code snippet from this project, a shell script that compiles and executes the code:
<div style="background: #f8f8f8; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #ff91af; font-style: italic"># Made a dir to store our compiled classes</span>
mkdir -p classes
<span style="color: #ff91af; font-style: italic"># Find our kotlin files</span>
<span style="color: #000000">kotlin_files</span><span style="color: #ff91af; font-weight: bold">=</span><span style="color: #204a87; font-weight: bold">$(</span>find src/main/kotlin/Grading/ -name <span style="color: #4e9a06">&quot;*.kt&quot;</span><span style="color: #204a87; font-weight: bold">)</span>
<span style="color: #204a87">echo</span> <span style="color: #000000">$kotlin_files</span>
<span style="color: #ff91af; font-style: italic"># Compile all files, save jar to working directory.</span>
kotlinc -include-runtime -d test_<span style="color: #000000">$1</span>.jar classes <span style="color: #000000">$kotlin_files</span>
<span style="color: #ff91af; font-style: italic"># Run the jar with an argument (classpath)</span>
kotlin -cp test_<span style="color: #000000">$1</span>.jar <span style="color: #000000">$2</span>
<span style="color: rgb(255,145,175); font-style: italic"># Remove temp files and directories.</span>
rm -r test_<span style="color: #000000">$1</span>.jar
rm -rf src/main/kotlin/Grading/<span style="color: #000000">$1</span>
</pre></div>

Now that we have a shell script that we can use to run our Kotlin code, now we just need to call the script from the server. This can be done with a
*build process*, and the syntax looks something like this:
<div style="background: #f8f8f8; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #204a87; font-weight: bold">fun</span> <span style="color: #000000">String</span><span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">runCommand</span><span style="color: #000000; font-weight: bold">():</span> <span style="color: #000000">String</span><span style="color: #000000; font-weight: bold">?</span> <span style="color: #000000; font-weight: bold">{</span>
    <span style="color: #204a87; font-weight: bold">try</span> <span style="color: #000000; font-weight: bold">{</span>
        <span style="color: #204a87; font-weight: bold">val</span> <span style="color: #000000">parts</span> <span style="color: #000000; font-weight: bold">=</span> <span style="color: #204a87; font-weight: bold">this</span><span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">split</span><span style="color: #000000; font-weight: bold">(</span><span style="color: #4e9a06">&quot;\\s&quot;</span><span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">toRegex</span><span style="color: #000000; font-weight: bold">())</span>
        <span style="color: #204a87; font-weight: bold">val</span> <span style="color: #000000">proc</span> <span style="color: #000000; font-weight: bold">=</span> <span style="color: #000000">ProcessBuilder</span><span style="color: #000000; font-weight: bold">(*</span><span style="color: #000000">parts</span><span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">toTypedArray</span><span style="color: #000000; font-weight: bold">())</span>
            <span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">redirectOutput</span><span style="color: #000000; font-weight: bold">(</span><span style="color: #000000">ProcessBuilder</span><span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">Redirect</span><span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">PIPE</span><span style="color: #000000; font-weight: bold">)</span>
            <span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">redirectError</span><span style="color: #000000; font-weight: bold">(</span><span style="color: #000000">ProcessBuilder</span><span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">Redirect</span><span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">PIPE</span><span style="color: #000000; font-weight: bold">)</span>
            <span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">start</span><span style="color: #000000; font-weight: bold">()</span>

        <span style="color: #000000">proc</span><span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">waitFor</span><span style="color: #000000; font-weight: bold">(</span><span style="color: #0000cf; font-weight: bold">60</span><span style="color: #000000; font-weight: bold">,</span> <span style="color: #000000">TimeUnit</span><span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">MINUTES</span><span style="color: #000000; font-weight: bold">)</span>
        <span style="color: #204a87; font-weight: bold">return</span> <span style="color: #000000">proc</span><span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">inputStream</span><span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">bufferedReader</span><span style="color: #000000; font-weight: bold">().</span><span style="color: #000000">readText</span><span style="color: #000000; font-weight: bold">()</span>
    <span style="color: #000000; font-weight: bold">}</span> <span style="color: #204a87; font-weight: bold">catch</span> <span style="color: #000000; font-weight: bold">(</span><span style="color: #000000">e</span><span style="color: #000000; font-weight: bold">:</span> <span style="color: #000000">IOException</span><span style="color: #000000; font-weight: bold">)</span> <span style="color: #000000; font-weight: bold">{</span>
        <span style="color: #000000">e</span><span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">printStackTrace</span><span style="color: #000000; font-weight: bold">()</span>
        <span style="color: #204a87; font-weight: bold">return</span> <span style="color: #204a87; font-weight: bold">null</span>
    <span style="color: #000000; font-weight: bold">}</span>
<span style="color: #000000; font-weight: bold">}</span>
<span style="color: #ff91af; font-style: italic">// This will print hello to the console using bash&#39;s echo command</span>
<span style="color: #000000">println</span><span style="color: #000000; font-weight: bold">(</span><span style="color: #4e9a06">&quot;echo hello&quot;</span><span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">runCommand</span><span style="color: #000000; font-weight: bold">())</span>
<span style="color: #ff91af; font-style: italic">// This will store the results of the above code to the variable &quot;output&quot;</span>
<span style="color: #204a87; font-weight: bold">val</span> <span style="color: #000000">studentID</span> <span style="color: #000000; font-weight: bold">=</span> <span style="color: #4e9a06">&quot;12345foobar&quot;</span>
<span style="color: #204a87; font-weight: bold">val</span> <span style="color: #000000">classPath</span> <span style="color: #000000; font-weight: bold">=</span> <span style="color: #4e9a06">&quot;MainKt&quot;</span>
<span style="color: #204a87; font-weight: bold">val</span> <span style="color: #000000">output</span> <span style="color: #000000; font-weight: bold">=</span> <span style="color: #4e9a06">&quot;./run.sh $studentID $classPath&quot;</span><span style="color: #000000; font-weight: bold">.</span><span style="color: #000000">runCommand</span><span style="color: #000000; font-weight: bold">()</span>
</pre></div>