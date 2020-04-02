#!/usr/bin/env sh

# build
npm run build

# build
npm publish .

# navigate into the build output directory
cd dist

# commit
git commit -m '0.0.6'

# push
git push -u origin master
