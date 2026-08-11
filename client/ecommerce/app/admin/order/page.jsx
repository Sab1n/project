'use client'
import { useMutation, useQuery } from "@tanstack/react-query";
import {getOrder} from '../../services/orderServices'

export default function Order() {

const {data, isLoading, isError} = useQuery({
    queryKey: ['order'],
    queryFn: getOrder
})
console.log('get bata ako orders',data)


return(
    <h1>hello</h1>
)
}

