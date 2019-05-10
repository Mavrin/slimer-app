#!/usr/bin/env bash

cp -r ./src ./dist
cp -r ./node_modules ./dist
cp ./package.json ./dist
cp ./main.js ./dist
cp ./index.html ./dist
cp ./LICENSE ./dist

./node_modules/.bin/electron-packager dist Rubberapp \
--out=package --asar.unpackDir=ffmpeg \
--overwrite \
--platform=${PLATFORM} \
--arch=${ARCH} \
--icon=./icon-dist/${ICON} \
--app-copyright='Copyright (c) 2019 Konstantin Krivlenia' \
--win32metadata.CompanyName=mifi \
--win32metadata.FileDescription=Rubberapp \
--win32metadata.OriginalFilename=Rubberapp.exe \
--win32metadata.ProductName=Rubberapp \
--win32metadata.InternalName=Rubberapp
