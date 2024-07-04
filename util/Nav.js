'use client'
import Link from "next/link";
import { signIn } from 'next-auth/react';
export default function Nav({session}) {

	const chkSession = () => {
		if(!session){
			window.alert('로그인하시오');
			signIn();
		}
	}




	return (
		<div>
			<Link href='/' className='nav_link'>Home</Link>
			<Link href='/list' className='nav_link'>List</Link>
			<Link href='/write' className='nav_link' onClick={chkSession}>Write</Link>
			{/* <Link href='/memberList' className='nav_link'>MemberList</Link> */}
			{/* <Link href='/register/join' className='nav_link'>회원가입</Link> */}
			{session ? "" : <Link href='/register' className='nav_link'>가입</Link>}
		</div>
	)
}
