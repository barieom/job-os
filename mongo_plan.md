PLAN FOR PERSISTENT DATA STORAGE:

MongoDB collection called "job-data"

Each record has the following fields:

-Job title (stored as a string)
-Department (stored as a string)
-Job description (stored as a string)
-Pay (stored as a number representing hourly wage)
-Average rating, other averages like schedule flexibility
-Hours/week (stored as a number)
-Link to apply (stored as a string)
-ARRAY of job reviews

Each review item stored in the array has the following fields:

-Rating (stored as a number 1-5)
-Work study or standard (stored as a string either exactly "work study" or "standard")
-Co worker rating (stored as a number 1-5)
-Hours/week (stored as a number)
-Can you do homework? (stored as a string either exactly "yes" or "no")
-Schedule flexibility (stored as a number 1-5)
-Other comments (stored as a string)

We will require that certain fields (like work study) be entered in one
specific style (not "w0rk stUdy") so that items can be sorted efficiently
for searches.


THINGS TO UPDATE WITH EACH RECORD CHANGE / KEEP IN MIND:

-Recalculate average rating for a job when a new review is added
-Recalculate other averages used for filtering search results
-Make sure that reviews are either stored in an array within the job, or
somehow tied to the object ID
-User reviews might not need to require job title, as the system will only
be able to match reviews to jobs using object IDs in MongoDB
