import { NextResponse } from 'next/server'
import { db, schools } from '../api/migrate'

export async function GET(req: Request) {
  const res = await db.select({
    state: schools.state,
    district: schools.district
  }).from(schools)
  return NextResponse.json(res)
}
