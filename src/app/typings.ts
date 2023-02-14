export interface User {
    email: string,
    password: string,
}

export interface UserWithFireBaseId {
    id: string,
    email: string,
    password: string,
}

export interface UserList {
    id: User,
}
