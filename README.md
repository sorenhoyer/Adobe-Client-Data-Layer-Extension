[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5bfdf9ce35ea4374807910f6cac5d3ef)](https://www.codacy.com/manual/klcodanr/Adobe-Client-Data-Layer-Extension?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=PerficientDigital/Adobe-Client-Data-Layer-Extension&amp;utm_campaign=Badge_Grade)
[![CircleCI](https://circleci.com/gh/PerficientDigital/Adobe-Client-Data-Layer-Extension.svg?style=svg)](https://circleci.com/gh/PerficientDigital/Adobe-Client-Data-Layer-Extension)

# Adobe Client Data Layer Launch Extension

A [Launch by Adobe](https://launch.adobe.com/) extension for integrating the [Adobe Client Data Layer](https://github.com/adobe/adobe-client-data-layer).

## Structure

The structure of this extension is somewhat different than a standard extension. The `src/` folder contains the source files, but these are not directly referenced in the extension.json. Instead, the compiled files are referenced under `dist/`. This project builds these files, using the following process:

-  Gulp copies the Spectrum styles from `node_modules/` -- note, you could also do more here with gulp around minification & concatentation
-  eleventy templates the views using the templates in `src/_includes/` and then copies over all of the other static files

## Use

This project uses Node, this assumes you already have Node installed. To run locally, first install the dependencies:

`npm install`

Then run the following:

`npm run watch`

You should now be able to test the project locally at:

[http:localhost:3000](http:localhost:3000)

If you want to build the project run:

`npm run build`
