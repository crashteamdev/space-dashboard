export interface IUser {
    uid: string;
    accessToken: string;
    displayName: string | null;
    email: string;
    photoURL: string | null;
}

export interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
    setIsCreated?: () => void;
}

export interface signInType {
    title?: string;
}

export interface loginType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
}