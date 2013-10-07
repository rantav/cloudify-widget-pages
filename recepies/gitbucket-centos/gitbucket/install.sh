#!/bin/bash
set -x -e

yum install -y wget
wget -O gitbucket.war https://github.com/takezoe/gitbucket/releases/download/1.6/gitbucket.war