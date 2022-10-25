import { HOST } from "../config"


export const fetchProducts = async ()=>{
    try{
        const res = await fetch(`${HOST}/products`)
        return res.json()
    } catch(err){
        console.log(err)
    }
}