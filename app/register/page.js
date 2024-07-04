'use client'

export default function Register() {
	const handleSubmit = async (event) => {
		event.preventDefault();

		const response = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: event.target.name.value,
				email: event.target.email.value,
				password: event.target.password.value,
			}),
		});

		if (!response.ok) {
			window.alert('중복된 이메일입니다.');
			return;
		}

		window.location.href = '/list';
};
	return (
		<div className="p-20">
			<form onSubmit={handleSubmit}>
				<input name='name' type='text' placeholder='이름'/>
				<input name='email' type='text' placeholder='이메일'/>
				<input name='password' type='password' placeholder='비밀번호'/>
				<button type='submit'>가입요청</button>
			</form>
		</div>
	)
}
