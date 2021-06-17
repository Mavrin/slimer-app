#!/usr/bin/env bash

cp -r ./node_modules ./dist
cp ./package.json ./dist
cp ./main.js ./dist
cp ./index.html ./dist
cp ./LICENSE ./dist

./node_modules/.bin/electron-packager dist slimer-app \
--out=package --asar.unpackDir=ffmpeg \
--overwrite \
--platform=${PLATFORM} \
--arch=${ARCH} \
--icon=./icon-dist/${ICON} \
--app-copyright='Copyright (c) 2019 Konstantin Krivlenia' \
--win32metadata.CompanyName=mifi \
--win32metadata.FileDescription=slimer-app \
--win32metadata.OriginalFilename=slimer-app.exe \
--win32metadata.ProductName=slimer-app \
--win32metadata.InternalName=slimer-app
