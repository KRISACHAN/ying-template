#！/usr/bin/env sh

set -e

git pull

npm run build

git add .
git commit -m "$1"
echo "$1"
git push