# ussc
Swingtech ussc mobile site

## Getting Started

Assuming that nodejs installed on the machine

npm install -g yarn

git clone https://github.com/stussc/ussc

Local development with hot reloading support

yarn start

### navigate to http://localhost:3000

## Production build

yarn build

Make sure that following lines are added at the top of build/manifest.appcache file. (we need to automate this step)

/

/index.html


copy the contents of build folder to deploy machine.


## src

### src/components

    all layouts and reusable components

### src/pages
    all pages

### src/utils
    code that effects the site


### src/data 

    JSON data files that drive site content

## static

    contains image assets

## tools

    source code used for extraction.  pdf -> txt source is not included, we need licensed copies of devex

    Documents transformed pdf -> txt -> json -> html

    This folder also has other pdf file in queue for extraction

## design

    All web site design artifacts and guidelines

## docs

    All USSC/Swingtech communication and USSC guide line source docs in word format


## manifest
/
/index.html

/chapter1.html
/chapter2.html
/chapter3.html
/chapter4.html
/chapter5.html
/chapter6.html
/chapter7.html
/chapter8.html

