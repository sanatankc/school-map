// @ts-nocheck
import { NextResponse } from 'next/server'
import { db, schools } from '../api/migrate'
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const affiliationCode: string = searchParams.get('affiliationCode');
  console.log('Fe')
  const res = await db.select().from(schools)
  console.log('done...')
  fs.writeFileSync('test.json', JSON.stringify(res))

  return NextResponse.json(res)
}

export async function POST(req: Request) {
  const school = await req.json()
  await db.insert(schools).values(school)
  
  return NextResponse.json({ success: true })
}