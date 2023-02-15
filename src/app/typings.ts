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

export interface Pokemon {
    name: string,
    url: string,
}

export interface PokemonsList {
    count: number,
    next: string,
    previous: string,
    results: Pokemon[],
}