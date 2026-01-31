#!/usr/bin/bash

DEST=dist/livi-utils
mkdir -p dist
mkdir -p $DEST

cp main.js $DEST
cp styles.css $DEST
cp manifest.json $DEST
