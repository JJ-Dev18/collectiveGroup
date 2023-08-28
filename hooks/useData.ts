import useSWR, { SWRConfiguration } from 'swr';
import {  Benefit, Benefits, IService, ItemInterface } from '../interfaces';


// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useData = ( config: SWRConfiguration = {} ) => {

    // const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );
    const { data : benefits, error : errorBenefits } = useSWR<Benefit[]>(`/api/benefits`, config );
    const { data: packages , error : errorPackages } = useSWR<ItemInterface[]>(`/api/packages`, config );
    const { data : products , error : errorProducts} = useSWR<ItemInterface[]>(`/api/products`, config );
    const { data : services , error : errorServices} = useSWR<IService[]>(`/api/services`, config );
    
    return {
        products : products || [],
        benefits : benefits || [],
        packages : packages || [],
        services : services || [],
        isLoading: !benefits || !packages || !products,
        errorBenefits,
        errorPackages,
        errorProducts,
    }

}