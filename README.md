[Surge]:https://surge.sh
[Harp]:http://harpjs.com/
[Atom]:https://atom.io/
[Babel]:http://babeljs.io
[webpack]:https://webpack.github.io/

# harp-babel

[Harp] boilerplate with [Babel] and [webpack] for ES6+ friendly development.
If you prefer Typescript, look [here](https://github.com/glued/harp-typescript)

I also have a new [Atom package](https://github.com/glued/harpy) which make using harp a snap with atom.

### Setup
You must have [Harp] installed globally first `npm install harp -g`

then pick any directory and run the following from the terminal / command prompt

    harp init -b glued/harp-babel
    npm install


### Run webpack
Run for development
```
npm run dev
```
Run for production (OSX)
```
npm run prod
```

Run for production (Windows)
```
npm run win-prod
```

Deploy to [Surge]
```
npm run deploy
```
In production, the javascript is minified and sourcemaps are removed.
This will also lint your code using ESLint and JSCSrc

These commands are defined in package.json
