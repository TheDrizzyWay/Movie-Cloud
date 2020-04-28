export interface RequestToken {
    success: boolean;
    expires_at: string;
    request_token: string;
}

export interface GuestToken {
    success: boolean;
    expires_at: string;
    guest_session_id: string;
    session_id?: string;
}

export interface SessionToken {
    success: boolean;
    session_id: string;
}
