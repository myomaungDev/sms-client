export interface userProps {
    _id: string;
    username: string;
    email: string;
    updatedAt: string;
    createdAt: string;
}

export interface smsProps {
    _id: string;
    phone_number: string;
    message: string;
    updatedAt: string;
    createdAt: string;
}

export interface jobProps {
    _id: string;
    isSent: boolean;
    title: string;
    started_at: string;
    updatedAt: string;
    createdAt: string;
}
