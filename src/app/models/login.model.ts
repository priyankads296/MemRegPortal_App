export interface LoginDetails
{
    Username: string| undefined,
    Password: string| undefined
    
}
export interface LoginResponse
{
    IsSuccess: boolean;
    Message: string,
    JWTToken:string
}

