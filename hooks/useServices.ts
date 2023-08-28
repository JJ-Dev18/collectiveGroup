import useSWR, { SWRConfiguration } from 'swr';
import {  Benefit, Benefits, IService, ItemInterface } from '../interfaces';


// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useServices = (url: string, config: SWRConfiguration = {} ) => {

    // const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );
    const { data, error } = useSWR<IService[]>(`/api${ url }`, config );

    return {
        services: data || [],
        isLoading: !error && !data,
        isError: error
    }

}