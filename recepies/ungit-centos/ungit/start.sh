#!/bin/bash
set -x
cd /tmp
rm -rf ungit
git clone git://github.com/FredrikNoren/ungit.git


#tty.js --port 8081 --deamonize

nohup ungit --port=8080 &

