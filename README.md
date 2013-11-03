On-the-Cent
===========

A build-your-own treasure hunt that only requires a pocket full of pennies and a smart phone.

Send your sweetheart, friend, kids, etc. on a treasure hunt!
They navigate from point to point by photos on their smart phone.
Each photo is of a location where a penny is hidden.
By entering the mint date stamped on each penny, they unlock the next photo
and find the next location until they reach the end of your trail,
to whatever reward you have in store!

# Build your trail
1. Find some interesting locations you want to include in your trail.
2. Decide on a start and end point for your trail.
3. Take photos of places where you will hide pennies. The first location should be somewhere known to the person who will be following your trail.  Each subsequent photo should be of a place that can be found from the previous location, usually by line of sight.
4. Add these photos to public/photos (sizing them for the Web is recommended).
5. Copy the JSON file in the trails folder and change the name.  The name will determine the unique URL for your trail.  E.g. myname.json would indicate a URL of the form: http://localhost:3000/trail?trail=myname
6. Include your own captions for each photo in the JSON file.  These can include hints or special messages.
7. Obtain one penny for each photo, of various mint years.
8. Hide one penny at each photo location, where random passers by won't disturb them, but can be found by the person following your trail. Note the mint year of each penny at each location.
9. Enter the mint years into the JSON file for each photo/location.
10. Send your lucky trailblazer a link to the URL for your trail!

# Tech
Built with Express/Node.js and Knockout.js.  HTML5 cache manifest is used to make a trail doable without Web connectivity.  HTML5 local storage remembers your place in the trail so you don't lose your place.
