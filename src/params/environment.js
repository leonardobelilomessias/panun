const dev = process.env.NEXT_PUBLIC_BASE_URL_DEV
const prod = process.env.NEXT_PUBLIC_BASE_URL_PROD

const environment = ()=>{
    if(process.env.NEXT_PUBLIC_MY_ENVIRONMENT==="prod") return prod
    else return dev
}

export  default environment