# neoscan

Logging for Neocron resists

## Pre-requisites

To enable logging add ENABLELOG="TRUE" to your neocron.ini

## Installation

Neoscan currently only supports windows.

Download the neoscan setup executable from [Releases](https://github.com/Herrad/neoscan/releases/latest)

## Development

We are accepting pull requests.

Releases are generated from the `master` branch using a combination of the `npm run package` and `npm run publish`. Publishing the package will generate a new github release based on the npm package version (overwriting the existing release if it exists).
