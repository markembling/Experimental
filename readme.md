This repository contains experimental code and ideas I have played with.

### MongoDbNotes

This is a small application I wrote to try out using [MongoDB][1] from C# using the [mongodb-csharp project][2] created by Sam Corder. It allows the user to create small notes and tag them (think a very basic version of StackOverflow tags). These notes are stored within a MongoDB database in a collection called "notes". The application is a small ASP.NET MVC 2 project and makes use of [.LESS][3] (which [I have previously written about][4]). Note that this is not intended to be an example of best practise or anything, it is just something I created to test out using MongoDB from C# (and as such, there are no tests...).

[1]: http://www.mongodb.org/
[2]: http://github.com/samus/mongodb-csharp
[3]: http://dotlesscss.com/
[4]: http://www.markembling.info/blog/view/better-css-with-dotless