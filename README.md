AngularJS interactive scheduler
====

### Background
At Washington State University, Joseph Villareal and I entered in a contest hosted by IEEE. 
They wanted a way to match WSU engineering students with prospective companies. Each company had a list of majors and years
that they were interested in and each student had a ranking of their company preference, along with metadata like name, 
dining preference, etc. Our challenge was to build a GUI-based system that could find two optimal matchings of students by any
reasonable heuristic.

### How it works
We used AngularJS to provide the interactivity that we needed, and then used the [Hungarian algorithm](http://en.wikipedia.org/wiki/Hungarian_algorithm)
to find an optimal matching. However, we were also exploring Lua at the time and decided to use [Moonshine](http://moonshinejs.org/), a JavaScript lua interpreter
to run the code. Somehow, it worked.

### Results
It's not maintained anymore, but it won the competition as far as I know!
