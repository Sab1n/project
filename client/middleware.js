import jwt from 'jsonwebtoken'
import {NextResponse} from 'next/server'

export function middleware(request){
    let token = request.cookies.get('adminToken')?.value
    if(!token){
        return NextResponse.redirect(
            new URL('/adminLogin',request.url)
        )
    }
    try {
        jwt.verify(token,process.env.JWT_SECRET_KEY)
        return NextResponse.next()
    } catch (error) {
        if(!token){
            return NextResponse.redirect(
                new URL('/adminLogin',request.url)
            )
        }
    }
}

export const config={
    macther:[
        "/admin/:path"
    ]
}
