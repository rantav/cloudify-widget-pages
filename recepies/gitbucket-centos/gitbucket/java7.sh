#!/bin/bash
set -x -e

sudo yum install -y java-1.7.0-openjdk.x86_64

/usr/lib/jvm/jre-1.7.0/bin/java -version