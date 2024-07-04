'use client'

import { signIn } from 'next-auth/react'

export default function LoginBtn() {
	return (
		<button className='mgr10' onClick={()=>{ signIn() }}>로그인</button>
	)
}
