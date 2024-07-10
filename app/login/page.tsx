import LoginForm from '@/components/LoginForm'
import Image from 'next/image'

const LoginPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="p-10 shadow-lg flex flex-col items-center justify-center bg-white rounded-lg">
				<Image src="/logomarca1.webp" alt="Locomarca Ribermax" width={ 287 } height={ 212 } priority />
				<LoginForm />
			</div>
		</div>
	)
}

export default LoginPage
