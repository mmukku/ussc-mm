# ussc
Swingtech ussc mobile site

## Getting Started

Assuming that nodejs installed on the machine
```
npm install -g yarn

git clone https://github.com/stussc/ussc

```

Local development with hot reloading support

```

yarn start

```

### navigate to http://localhost:3000

## Production build

yarn build

Make sure that following lines are added at the top of build/manifest.appcache file. (we need to automate this step)

```
/
/index.html
```

Add the following to the bottom of the manifest.appcache file

```
FALLBACK:
. /
```

Copy the contents of build folder to deploy machine.

For the offline feature to work, the site must be serving requests over https.

As we are using client side router, we don't have the physical files at the web server, so we need to tell web server to server the root of the site and not fail with 404.

When deploying on IIS, make sure the [Url Rewrite Module](https://www.iis.net/downloads/microsoft/url-rewriteURL) is installed.

When deploing on any other webserver enable the URL rerouting to honor server side rerouting..  Apache example 

```
RewriteEngine On  
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]

RewriteRule ^ /index.html [L]
```

## Building index data for full text search on guidelines

In the terminal from project root.  This creates gl_index.json file in data folder.

node buildIndex.js

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


## manifest/
```

/
/index.html

FALLBACK:
. /

```