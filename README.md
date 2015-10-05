#store-blog

##Description
A web-store/blog written using the expressjs framework. Make sure to look though
the package.json for all the required dependencies. Currently all the data is
stored via postgresql locally.

##Configuration
Install nodejs and npm, and run 'npm install' to install all dependencies

##DB
The database connection string as specified in cart, index, and user specifies a
database 'rxr'. Make sure you either name your database for the application
"rxr", or you change the connection strings to your specified database name.
Most of the table attributes are pretty self-explanatory, but just as a note, in
order to be able to view images of the items in the shopping cart/items page,
the image attribute of the item table must be populated with a link to an image
of the particular item.
