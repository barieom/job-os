Project Status Report 3
Web Programming, Ming Chow

Team Six
Barry Eom * Julia Hedrick * Ben Solomon

Project Title
Job-os

————————————————————————————————————————————

What was accomplished during the week?

This week, we made progress in a variety of areas. Most importantly, our project
is now tied to Heroku and properly setup to use MongoDB. We spent quite a bit
of time working with Heroku to understand how it interacts with GitHub. Our team
now has a finalized plan for storing data in MongoDB and we have begun to
implement this. Job-os will use 3 different GET requests and 2 different
POST requests.

As we started the server side of Job-os, it became clear that several changes
were necessary for our site to be useful. For example, we converted our
"Find a Job" search tool into a job listing page. Most universities will not
have enough on-campus jobs to warrant a search tool. We believe that Job-os
will be more helpful if it renders all job listings on one page.

Our forms are now aligned with the way data is stored. For example, we limit
the "Hours/week" field to only accept one number. This way, we avoid case-
sensitivity and other user input errors when sorting data. We built both POST
requests to receive data from the forms.


What challenges and issues were faced during the week?

Our team struggled with connecting Heroku to GitHub. Although we received help
from Ming via email, we incorrectly tried to nest our server within the GitHub
repository. After git printed several errors, we managed to separate the
components and make them work together. Other than this, we were extremely
productive and are set to have the full project working shortly.


What are the goals for next week?

By next week, we plan to have Job-os fully functional. Demo Day is coming up
and we want to have time to conduct extensive testing! This mostly involves
handling loose ends on the server side. But many finishing touches will be
required to make everything work together.
