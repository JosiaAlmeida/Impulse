//sobre-escrevendo Request
declare namespace Express{
    export interface Request{
        user_id: string
    }
}