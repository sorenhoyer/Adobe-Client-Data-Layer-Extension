[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ba04d9ecddf14a8194b07e3d4eb7df5b)](https://app.codacy.com/app/klcodanr/Sample-Launch-Extension?utm_source=github.com&utm_medium=referral&utm_content=PerficientDigital/Sample-Launch-Extension&utm_campaign=Badge_Grade_Dashboard)
[![CircleCI](https://circleci.com/gh/PerficientDigital/Sample-Launch-Extension.svg?style=svg)](https://circleci.com/gh/PerficientDigital/Sample-Launch-Extension)
![LGTM Alerts](https://img.shields.io/lgtm/alerts/github/PerficientDigital/Sample-Launch-Extension)
![David](https://img.shields.io/david/PerficientDigital/Sample-Launch-Extension)
![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/PerficientDigital_Sample-Launch-Extension?server=https%3A%2F%2Fsonarcloud.io)

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
