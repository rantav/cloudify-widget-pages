#!/bin/bash

if [ -z "$1" ]
  then
    echo "Usage:"
    echo "       $0 package-name"
    exit 1
fi

echo "Zipping $1...."
zip -r $1.zip $1

echo Testing...
unzip -l $1.zip

echo DONE

