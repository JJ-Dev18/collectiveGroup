import useSWR, { SWRConfiguration } from 'swr';
import {  ItemInterface } from '../interfaces';


// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const usePackages = (url: string, config: SWRConfiguration = {} ) => {

    // const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );
    const { data, error } = useSWR<ItemInterface[]>(`/api${ url }`, config );

    return {
        packages: data || [],
        isLoading: !error && !data,
        isError: error
    }

}