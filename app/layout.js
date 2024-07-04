import Link from 'next/link';
import './globals.css'
import LoginBtn from '@/util/LoginBtn';
import LogoutBtn from '@/util/LogoutBtn';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Nav from '@/util/Nav';
import { cookies } from 'next/headers';
import Mode from './Mode';

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions);

 
	let res = cookies().get('mode');


  return (

    <html>
      <body className={res.value != undefined && res.value == 'dark' ? 'dark-mode' : ''}>
        <div className='nav'>
          <Nav session={session} />
          <Mode cookies={res}/>
          <div>
            {session ?  <p className='pdr10 dis-in-block'>환영합니다! {session.user.name}님</p>  :  ""}
						{session ?  <LogoutBtn/>  :  <LoginBtn/>}
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
