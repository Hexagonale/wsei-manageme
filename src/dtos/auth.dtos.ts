export interface LoginRequest {
	login: string;
	password: string;
}

export interface LoginResponse {
	token: string; // JWT Token
	refreshToken: string;
}

export interface RefreshTokenRequest {
	refreshToken: string;
}

export interface RefreshTokenResponse {
	token: string; // New JWT Token
}
