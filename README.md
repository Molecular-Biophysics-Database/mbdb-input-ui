Input form testing repositors
===

*IMPORTANT NOTE:*
---
***Code in this repository will be integrated into `mbdb-app`. It is currently being developed separately to simplify the development process.***

Quick and dirty build instructions
---
Before you begin, make sure that you have [Node.js](https://nodejs.org) installed.

1) In a terminal navigate to the directory with the source code.
2) Run `npm install`
3) Run `npm run serve-dev`
4) When the project finishes building, open [http://localhost:9779](http://localhost:9779) in your browser.

- The project is rebuilt and reloaded automatically whenever a part of the source code is changed.
- Larger changes might require you to reload the page manually

Incremental rebuilds may occassionally cause inconsistencies in the built bundle. To force a full development rebuild:
1) Exit the `serve-dev` command, if it is running.
2) Remove `tsconfig.development.tsbuildinfo` file.
3) Remove `lib` directory.
4) Run `npm run serve-dev` again.

If you wish to only build the application but not start the development web server, run `npm run build-dev` command instead.
