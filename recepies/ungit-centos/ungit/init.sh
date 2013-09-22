#!/bin/bash

sudo wget http://download.rethinkdb.com/centos/6/`uname -m`/rethinkdb.repo \
           -O /etc/yum.repos.d/rethinkdb.repo