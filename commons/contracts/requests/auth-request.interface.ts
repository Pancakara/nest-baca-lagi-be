export interface IBasicAuthRequest {
	email: string;
	password: string;
}

export interface IGoogleAuthRequest {
	googleToken: string;
}

export interface IRefreshTokenRequest {
	refreshToken: string;
}
