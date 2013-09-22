#!/bin/bash
set -x
cd /tmp
rm -rf ungit
git clone git://github.com/FredrikNoren/ungit.git
cd ungit
nohup ungit --port=8080 &

tty.js --port 8081 --deamonize