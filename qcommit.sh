#!/bin/bash

current_branch=$(git branch | grep \* | tr -d ' *')

git pull
git add .
git commit -m "$1"
git push origin $current_branch

