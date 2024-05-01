// --------- Authorization  -------------

export interface Signup{
    full_name: string,
    email: string,
    password: string,
    phone_number: string
}

export interface Signin{
    email: string,
    password: string,
}

export interface AuthVerify{
    code: string,
    email: string,
}

export interface Request{
    sign_up:(data:Signup)=>any,
    sign_in:(data:Signin)=>any,
    auth_verify:(data:AuthVerify)=>any,
}




// ------------------------------------