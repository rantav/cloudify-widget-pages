#!/bin/bash
set -x -e

cd /tmp
rm -rf ungit
git clone git://github.com/FredrikNoren/ungit.git


nohup ungit --port=8081 &
echo "{\"cwd\":\"/tmp/ungit\"}" > ~/.tty.js/config.json
tty.js --port 8080 --deamonize &

