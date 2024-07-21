import { NextRequest, NextResponse } from 'next/server'
import { fetchFromExternalApi } from '@/app/api/utils'

export const GET = async ( req: NextRequest ) => await fetchFromExternalApi( req )

export const POST = async ( req: NextRequest ) => await fetchFromExternalApi( req )

export const PUT = async ( req: NextRequest ) => await fetchFromExternalApi( req )

export const PATCH = async ( req: NextRequest ) => await fetchFromExternalApi( req )

export const DELETE = async ( req: NextRequest ) => await fetchFromExternalApi( req )