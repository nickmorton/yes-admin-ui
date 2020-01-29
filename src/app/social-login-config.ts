import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';

export function getAuthServiceConfig() {
	return new AuthServiceConfig([
		{ id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider('304391313964-7bf8g0lp1t1a01b30nf465agu7oi05h8.apps.googleusercontent.com') }
	]);
}
