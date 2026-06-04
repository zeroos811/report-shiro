import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'
import { getSession } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const month = parseInt(searchParams.get('month') || String(new Date().getMonth() + 1))
  const year  = parseInt(searchParams.get('year')  || String(new Date().getFullYear()))

  const { data: daily }   = await db().from('targets').select('*').eq('type','daily').order('created_at',{ascending:false}).limit(1).single()
  const { data: monthly } = await db().from('targets').select('*').eq('type','monthly').eq('month',month).eq('year',year).order('created_at',{ascending:false}).limit(1).single()

  return NextResponse.json({
    daily:   daily   || { type: 'daily',   amount: 2000000 },
    monthly: monthly || { type: 'monthly', amount: 45000000, month, year },
  })
}

export async function POST(req: NextRequest) {
  if (!getSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { type, amount, month, year } = body

  if (type === 'daily') {
    await db().from('targets').delete().eq('type', 'daily')
    const { data } = await db().from('targets').insert({ type, amount }).select().single()
    return NextResponse.json({ target: data })
  }
  if (type === 'monthly') {
    await db().from('targets').delete().eq('type','monthly').eq('month',month).eq('year',year)
    const { data } = await db().from('targets').insert({ type, amount, month, year }).select().single()
    return NextResponse.json({ target: data })
  }
  return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
}
