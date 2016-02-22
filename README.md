# Jekyll Manager

> An experiment with electron.

Hyde: A Jekyll Manager lets you locally manager your Jekyll sites' content.
Note that this isn't a theme editor, though it enables theme editing.
It's first and foremost a content editor, focusing on making Jekyll themes manageable by people who don't live in the terminal or command line.

## To get it running:

```
$ git clone git@github.com:simonv3/jekyll-manager.git
$ cd jekyll-manager/
$ npm install     # Install all the node modules
$ bower install   # Install all the bower things
$ mkdir .websites # For now, make a .websites folder. Hopefully this will be automated in the future.
$ gulp serve      # Serve our electron app
```

You can then create a website (type in a name), give the electron app some time to process, and then click on "serve". Now you can access your jekyll website at `localhost:4000`


