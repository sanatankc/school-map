import { db, schools } from './migrate'

// const csvToSchemaName = 
const main = async ()  => {
  console.log('migrating....')
  // await migrate(db, { migrationsFolder: './' });
  
  
  // console.log('hqllooo......')
  await db.insert(schools).values({
    name: "St. Joseph's School",
    affiliationCode: 1
  })
  console.log('Data inserted successfully')
}

export default main