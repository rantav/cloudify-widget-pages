#!/bin/bash
set -x
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source $DIT/build.sh
source $DIT/git.sh
source $DIR/npm.sh

npm install tty.js