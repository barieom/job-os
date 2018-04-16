Project Status Report 1
Web Programming, Ming Chow

Team Six
Barry Eom * Julia Hedrick * Ben Solomon

Project Title
Job-os

————————————————————————————————————————————

What was accomplished during the week?

This week we began to consider how our job data will be collected. One possibility
was to gather data from an API, while another was to have users submit job
listings directly through Job-os. After extensive research we decided on the
latter. Direct submissions allow us to control the data more effectively
and avoid working with too many APIs.

We also developed a plan for persistent data storage (see mongo_plan.md). When
creating this document, we outlined the different components of each record
in MongoDB used for job listings and reviews. This will make it easy to implement
storage capabilities.

Lastly, we began to tweak our navigation bar. There were several issues with
the original design, and we are still learning to use Bootstrap for this tool.
By next week, we hope to have a more polished navigation tool that appears on
all of our pages. This was largely a planning week, as we wanted to wait to develop
our MongoDB skills with Assignment 3 before continuing.


What challenges and issues were faced during the week?

We struggled to understand some of the job APIs we could use to gather job data.
We initially reasoned that we could try to access the job information via JobX, an 
online job platform. However, after some attempts at locating an API for JobX, we
were not able to find any. Because of this (and other factors), Job-os will have 
users directly submit listings for the website--similar to ratemyprofessors.



What are the goals for next week?

By next week, we hope to have a page for job submissions, a start on our
MongoDB implementation, and a better navigation bar.

# Comments by Ming
* An idea: how about using posts and data from COMP 199 Piazza to seed your database?  I don't/didn't know of any jobs board APIs out there, forget about good ones.
* There is an unofficial Piazza API on GitHub: https://www.npmjs.com/package/piazza-api
