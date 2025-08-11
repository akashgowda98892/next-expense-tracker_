import React from 'react'
import { checkUser } from '@/lib/checkuser'
export const Navbar = () => {
    const user = checkUser()
    return (
        <div>Navbar</div>
    )
}
