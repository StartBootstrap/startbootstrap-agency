## deploy site
git subtree push --prefix dist origin gh-pages

## remove remote branch if error
git push origin :gh-pages
