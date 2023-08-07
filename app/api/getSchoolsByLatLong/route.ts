import { sql, eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { db, schools } from '../api/migrate'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const radius: number = Number(searchParams.get('radius')) * 1000;
  const lat: number = Number(searchParams.get('lat'));
  const long: number = Number(searchParams.get('long'));

  if (!lat || !long || !radius) {
    return NextResponse.json({ error: 'One or more parameters are missing'}, { status: 400 })
  }
  
  const { rows } = await db.execute(sql.raw(
    `SELECT 
      (ATAN(
          SQRT(
              POW(COS(RADIANS(schools.lat)) * SIN(RADIANS(schools.long) - RADIANS(${long})), 2) +
              POW(COS(RADIANS(${lat})) * SIN(RADIANS(schools.lat)) - 
            SIN(RADIANS(${lat})) * cos(RADIANS(schools.lat)) * cos(RADIANS(schools.long) - RADIANS(${long})), 2)
          )
          ,
          SIN(RADIANS(${lat})) * 
          SIN(RADIANS(schools.lat)) + 
          COS(RADIANS(${lat})) * 
          COS(RADIANS(schools.lat)) * 
          COS(RADIANS(schools.long) - RADIANS(${long}))
      ) * 6371000) as distance,
      affiliationCode,
      name,
      state,
      district,
      address,
      lat,
      long,
      website,
      establishmentYear,
      (grade1TotalStudents +
      grade2TotalStudents +
      grade3TotalStudents +
      grade4TotalStudents +
      grade5TotalStudents +
      grade6TotalStudents +
      grade7TotalStudents +
      grade8TotalStudents +
      grade9TotalStudents +
      grade10TotalStudents +
      grade11TotalStudents +
      grade12TotalStudents) as studentCount,
      admissionFeeSeniorSecondary,
      admissionFeeSecondary,
      admissionFeeMiddle,
      admissionFeePrimary,
      tuitionFeeSeniorSecondary,
      tuitionFeeSecondary,
      tuitionFeeMiddle,
      tuitionFeePrimary,
      yearlyDevChargesSeniorSecondary,
      yearlyDevChargesSecondary,
      yearlyDevChargesMiddle,
      yearlyDevChargesPrimary,
      otherChargesSeniorSecondary,
      otherChargesSecondary,
      otherChargesMiddle,
      otherChargesPrimary,
      feeStructureLastUpdated

      FROM schools
      HAVING distance < ${radius}
      ORDER BY distance ASC`))

  if (rows && rows.length) {
    return NextResponse.json({ schools: rows.map((row) => ({
      ...row,
      isSearchedSchool: row.affiliationCode === affiliationCode,
    })) })
  }

  return NextResponse.json({ error: 'No schools found' }, { status: 404 })
}