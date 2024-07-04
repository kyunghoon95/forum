'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Mode({cookies}) {

	const router = useRouter();

	useEffect(()=>{
		if (!cookies.value) {
			document.cookie = 'mode=light; max-age=31536000';
		}
	},[]);

	const changeMode = () => {
		if(cookies.name == 'mode' && cookies.value == 'light'){
			document.cookie = 'mode=dark; max-age=31536000';
			router.refresh();
		} else {
			document.cookie = 'mode=light; max-age=31536000';
			router.refresh();
		}
	}
	

	return (
		<div>
			<span onClick={changeMode}>{cookies.value == 'light'? '🌑' : '🌕'}</span>
		</div>
	)
}
