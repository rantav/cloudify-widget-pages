#!/bin/bash

rm -rf ungit
git clone git://github.com/FredrikNoren/ungit.git
cd ungit
nohup ungit &
