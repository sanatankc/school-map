// @ts-nocheck
import fs from 'fs'
import path from 'path';

import * as cheerio from 'cheerio';
import fetch from 'node-fetch'
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { NextResponse } from 'next/server'
import scrapePath from './scrapePath'
import affiliationIds from './affiliationIds'

import userAgents from './userAgents'

const csvFilePath = path.resolve(process.cwd(), 'app', 'api', 'schoolData.csv');

const getCSVHeaders = (filePath) => {
  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
    const firstLine = fs.readFileSync(filePath, { encoding: 'utf8' }).split('\n')[0];
    return firstLine.split(',');
  }
  return [];
}
let headers = getCSVHeaders(csvFilePath);


const getLatLong = async (schoolName, state, district) => {
  const searchTerm = schoolName + ' ' + state + ' ' + district
  console.log('getting lat long...', searchTerm)
  let url = 'https://www.edustoke.com/common/server/apis/getPlacesSuggestion.php?input=' + encodeURI(searchTerm)
  let res = await fetch(url, {
    headers: {
      'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)]
    }
  })
  let json = await res.json()
  if (json && json.data && json.data.length > 0) {
    const placeId = json.data[0].place_id
    const plad = await fetch(`https://www.edustoke.com/common/server/apis/getPlacesInfo.php?place_id=${placeId}`)
    const pladJson = await plad.json()
    const lat = pladJson.geometry.location.lat
    const long = pladJson.geometry.location.lng
    console.log('Got Lat Long', {
      lat,
      long
    })
    return {
      lat,
      long
    }
  }
  return {
    lat: null,
    long: null
  }
}

function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor((duration / (1000 * 60 * 60 * 24)));

  let time  = ''

  if (days > 0) {
    time = days + "d "
  }
  if (hours > 0) {
    time = hours + "h "
  }
  if (minutes > 0) {
    time = time + minutes + "m "
  }
  if (seconds > 0) {
    time = time + seconds + "s "
  }

  if (hours === 0 && minutes === 0 && seconds === 0) {
    time = duration + "ms "
  }

  return time
}

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 1000 * 60 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => {
    controller.abort()
    console.log('timeout, aborting...')
    console.log('Trying again... in 1 minute')
    setTimeout(async () => {
      console.log('Trying again...')
      return await fetchWithTimeout(resource, options)
    }, 60000)
  }, timeout);

  const response = await fetch(resource, {
    ...options,
    // agent: proxyAgent,
    signal: controller.signal  
  });
  clearTimeout(id);

  return response;
}


const loadDataFromCSV = () => {
  const csvData = fs.readFileSync(csvFilePath);
  return parse(csvData, {
    columns: true,
    skip_empty_lines: true
  });
}

const appendDataToCSV = (data) => {
  
  // If there are no headers, assume this is the first write and use keys from data
  if (headers.length === 0) {
    headers = Object.keys(data);
  }

  // Check if file exists and has content; if not, write headers
  if (!fs.existsSync(csvFilePath) || fs.statSync(csvFilePath).size === 0) {
    const csvHeader = stringify([data], { header: true, columns: headers });
    fs.writeFileSync(csvFilePath, csvHeader);
  } else {
    const csvData = stringify([data], { header: false, columns: headers });
    fs.appendFileSync(csvFilePath, csvData);
  }
}

export async function GET() {
  const startTime = new Date().getTime();
  let i = 0;
  let log = '';
  let schoolData = loadDataFromCSV();
  

  let idsToScrape  = affiliationIds.reverse()
  let cursorId = Number(schoolData[schoolData.length - 1].affiliationCode)
  console.log('Resuming from --> ', cursorId, schoolData[schoolData.length - 1].name)
  let curorIndex = affiliationIds.findIndex((data) => Number(data.id) === cursorId)
  idsToScrape = affiliationIds.slice(curorIndex)

  for (const affilatedSchool of idsToScrape) {
    try {
      let currentStartTime = new Date().getTime()
      console.log('searching in CSV...', {
        affiliationCode: parseInt(affilatedSchool.id)
      });

      const schoolExists = schoolData.some(school => school.affiliationCode === affilatedSchool.id);
      if (!schoolExists) {
        console.log('not found in CSV, getting from cbse...');

        const res = await fetchWithTimeout("https://saras.cbse.gov.in/maps/finalreportDetail?AffNo=" + affilatedSchool.id);
        const html = await res.text();
        const $ = cheerio.load(html);

        const school = {};
        for (const property of Object.keys(scrapePath)) {
          const path = scrapePath[property].path;
          const validator = scrapePath[property].type;
          const elem = scrapePath[property].elem;
          let value = $(path).first().text().trim();
          const sanitisedValue = validator(value);  
          school[property] = sanitisedValue;
        }

        if (school.name) {
          const { lat, long } = await getLatLong(school.name, affilatedSchool.state, affilatedSchool.district);
          school.lat = lat;
          school.long = long;
          school.affiliationCode = parseInt(affilatedSchool.id);
          school.state = affilatedSchool.state;
          school.district = affilatedSchool.district;
          school.board = 'CBSE';
          // console.log('Json stringiofy log -> ', JSON.stringify(school, null, 2))
          appendDataToCSV(school);
          console.log('Added to CSV');
        } else {
          console.log('Could not find the details...');
        }
        i++;
        console.log('Pausing for 1 seconds...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        console.log('Already in CSV');
        console.log('Skipping...');
      }


      let timeTaken = new Date().getTime() - startTime;
      let currentTimeTaken = new Date().getTime() - currentStartTime;
      console.log('Time taken --> ', msToTime(currentTimeTaken));
      console.log('Estimated time remaining --> ', msToTime((timeTaken / i) * (affiliationIds.length - i)));

      // if (i % 500 === 0 && i !== 0) {
      //   console.log('Pausing for 5 minutes...');
      //   await new Promise(resolve => setTimeout(resolve, 300000));
      // }
      console.log('-----------------------------------');
    } catch (e) {
      console.log('Error --> ', e);
    }
  }
  return NextResponse.json({ success: 'done' });
}
