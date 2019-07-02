#！/usr/bin/env sh

set -e

npm run build

git pull
git add .
git commit -m "$1"
echo "$1"
git push