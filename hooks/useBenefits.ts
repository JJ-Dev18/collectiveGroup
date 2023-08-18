import useSWR, { SWRConfiguration } from 'swr';
import {  Benefit, Benefits, ItemInterface } from '../interfaces';


// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useBenefits = (url: string, config: SWRConfiguration = {} ) => {

    // const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );
    const { data, error } = useSWR<Benefit[]>(`/api${ url }`, config );

    return {
        benefits: data || [],
        isLoading: !error && !data,
        isError: error
    }

}