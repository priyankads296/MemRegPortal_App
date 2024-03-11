export interface RegisterDetails
{
    Firstname: string,
    Lastname: string,
    Username: string,
    Password:string,
    Phoneno:string
}
export interface RegisterResponse
{
    IsSuccess: boolean,
    Message: string
    // data: RegisterDetails[]
}