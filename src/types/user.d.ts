// interface for Usersession
export interface UserSession {
  userName: string;
  userId: number;
}

// interface for Usersession
export interface UserSessionState {
  user: UserSession;
}

// interface for payload for register api
export interface UserRegister {
  firstName: string,
    lastName: string,
    userEmail: string,
    password: string,
}

// interface for payload for login api
export interface UserLogin {
    userEmail: string,
    password: string,
}
