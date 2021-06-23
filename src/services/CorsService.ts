import { Response } from "express";

export default (res:Response)=>{
    // res.header('Origin','*')
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Request-Headers',['X-PINGOTHER','Content-Type'])
    res.header('Access-Control-Request-Methods',['POST','PUT','GET','DELETE'])
    res.header('Access-Control-Max-Age',' 86400')
    return res
}