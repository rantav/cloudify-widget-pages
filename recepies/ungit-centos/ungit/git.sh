#!/bin/bash
set -x -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


wget http://git-core.googlecode.com/files/git-1.8.3.4.tar.gz
sudo yum install -y zlib-devel perl-CPAN gettext
tar xvfz git-1.8.3.4.tar.gz
cd git-1.8.3.4
./configure
make
sudo make prefix=/usr install
git --version

