#!/bin/bash

current_branch=$(git branch | grep \* | tr -d ' *')

git pull # update current_branch (should be master)
git checkout gh-pages # go to the gh-pages branch
git rebase $current_branch # bring gh-pages up to date with master
git push origin gh-pages # commit the changes
git checkout $current_branch # return to the master branch
