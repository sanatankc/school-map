import algoliasearch from 'algoliasearch'
import { db, schools } from '../api/migrate'
const client = algoliasearch('PMMWBPYRRV', '22c79ad61039ee5a391880f794269af9')
import fs from 'fs'



export async function GET(req: Request) {

  const res = await db.select({
    objectID: schools.affiliationCode,
    name: schools.name,
    state: schools.state,
    district: schools.district,
    address: schools.address,
  }).from(schools)

  console.log('Successful res --> ', res)

  fs.writeFileSync('test.json', JSON.stringify(res))
  // const index = client.initIndex('dotstudio')

  // let i = 0
  // for (const school of res) {
  //   i++
  //   console.log('Adding school to search --> ', i);
  //   index.saveObject(school).wait()
  //   console.log('Done')
  // }
  
  // // Search the index and print the results
  // index
  //   .search('test_record')
  //   .then(({ hits }) => console.log(hits[0]))

}