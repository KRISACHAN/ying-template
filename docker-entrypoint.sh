#!/bin/sh
set -e

green='\e[21;32m%s\e[0m\n'
yellow='\e[21;33m%s\e[0m\n'
blue='\e[21;34m%s\e[0m\n'
cyan='\e[21;36m%s\e[0m\n'

rootDir=$(cd $(dirname $0); pwd)
EXPOSE_PORT=8200
SERVER_PORT=80
DOCKER_TAG=app/ying-template

printf "$yellow" "[ 1 / 2 ] >> 开始构建你的 $DOCKER_TAG 辣～"
printf "$blue" "===================================="
docker build -t ${DOCKER_TAG} .

printf "$green" "[ 2 / 2 ] >> 赶紧吐出，吐出端口号：$EXPOSE_PORT"
printf "$green" "现在可以打开你的 http://localhost:$EXPOSE_PORT 康效果了哦～"
printf "$blue" "===================================="
printf "$cyan" "$rootDir/dist"
docker run -it -p ${EXPOSE_PORT}:${SERVER_PORT} -v ${rootDir}/dist:/usr/share/nginx/html:ro ${DOCKER_TAG}