lermontov:platforma-opi pechorin$ nano qcommit.sh 

  GNU nano 2.0.6                                               File: qcommit.sh                                                                                                      

#!/bin/bash

current_branch=$(git branch | grep \* | tr -d ' *')

git pull
git add .
git commit -m "$1"
git push origin $current_branch

