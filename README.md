# Countries GeoJson data

Data processor merging countries data and geoJson data into files grouped by continent name.

Feature:
- Geometry
- Properties:
  - Country name (en) and other translations
  - Capital city
  - Population and last census
  - Lat/Lng
  - Area in km²
  - Flag

Outputs the countries grouped by continent and flags in the provided path.

## Usage

You should first clone
[https://github.com/AshKyd/geojson-regions](https://github.com/AshKyd/geojson-regions)
and 
[https://github.com/mledoze/countries](https://github.com/mledoze/countries), 
then run the script using either the CLI or the JS API.


### Command line

- `geoJson`: Path to the file in the *geojson-regions* repository providing a collection of features
  50m precision is used in the example above, but any should work
- `countries`: Path to the file in the *countries* repository providing the list of country data
- `flags`: Path to the flags directory in the *countries* repository
- `output`: Path to the directory where to store the output data
- `outputFlags`: Path to the directory where to store the flags

**Example:**

```bash
node .  --geoJson     ../geojson-regions/countries/50m/all.geojson \ 
        --countries   ../countries/countries.json                  \ 
        --flags       ../countries/data/                           \
        --output      dist                                         \
        --outputFlags dist/flags    
```

`output`, `outputFlags` directories will be created if required.

### Logs

The project uses [debug](https://www.npmjs.com/package/debug) for debugging logs.
Use `DEBUG=*` or `DEBUG=cgd-*` to output the log info.

### JavaScript API

The `src/index` module documents the JS API which mirrors the CLI API. 

## Data

Example of data for one country where `dist/flags` was passed as `outputFlags` parameter.

```json
{
  "properties": {
    "id": "ITA",
    "name": "Italy",
    "continent": "Europe",
    "populationEstimate": 58126212,
    "lastCensus": 2012,
    "capital": "Rome",
    "latlng": [
      42.83333333,
      12.83333333
    ],
    "area": 301336,
    "translations": {
      "deu": {
        "official": "Italienische Republik",
        "common": "Italien"
      },
      "fra": {
        "official": "République italienne",
        "common": "Italie"
      },
      "hrv": {
        "official": "talijanska Republika",
        "common": "Italija"
      },
      "ita": {
        "official": "Repubblica italiana",
        "common": "Italia"
      },
      "jpn": {
        "official": "イタリア共和国",
        "common": "イタリア"
      },
      "nld": {
        "official": "Italiaanse Republiek",
        "common": "Italië"
      },
      "por": {
        "official": "República Italiana",
        "common": "Itália"
      },
      "rus": {
        "official": "итальянская Республика",
        "common": "Италия"
      },
      "slk": {
        "official": "Talianska republika",
        "common": "Taliansko"
      },
      "spa": {
        "official": "República Italiana",
        "common": "Italia"
      },
      "fin": {
        "official": "Italian tasavalta",
        "common": "Italia"
      },
      "zho": {
        "official": "意大利共和国",
        "common": "意大利"
      }
    },
    "flag": "dist/flags/ITA.svg"
  },
  "geometry":{
    "type":"MultiPolygon",
    "coordinates":[
      // ...
    ]
  }
}
```

## Contributions

If you notice an error in the dist data, please notify or fix it in the original repository, then contact me to update the dist data.
Feel free to propose new features/improvements to the script.

## Credits

Special thanks to 
[Ash Kyd - GeoJson regions](https://github.com/AshKyd/geojson-regions) 
and 
[Mohammed Le Doze - Countries](https://github.com/mledoze/countries)
for their projects gathering the countries data.

As well as:

- [Async](https://caolan.github.io/async/)
- [debug](https://www.npmjs.com/package/debug)
- [filecopy](https://www.npmjs.com/package/filecopy)
- [mkdirp](https://www.npmjs.com/package/mkdirp)
