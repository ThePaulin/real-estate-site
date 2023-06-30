import { sanityClient, urlFor } from '@/client';
import Layout from '@/components/global/Layout'
import { useUrl } from '@/hooks';
import type { IPropertyFull } from '@/types';
import React, { Suspense, useEffect, useState } from 'react'
import { Grid, IconBath, IconBed, Section, Text } from '@/components/elements';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import Link from 'next/link';



export const getServerSideProps: GetServerSideProps<{
    properties: IPropertyFull[]
  }> = async (context) => {
    //   const { slug }: {slug: string} = context.query
      const query = `*[_type == "property" && status == "Available" || status == "Pending" ]{ ...,images->{...,images[0]}, contact->}`;
      const properties:IPropertyFull[] = await sanityClient.fetch(query);
    return { props: { properties } }
  }
  


const Search = (
    {
        properties
    }: InferGetServerSidePropsType<typeof getServerSideProps>
  ) => {

    const {href, search} = useUrl();

    const [found, setFound] = useState<IPropertyFull[]>([]);
    const [foundAndFiltered, setFoundAndFiltered] = useState<IPropertyFull[]>([]);
    
    
    const decodedUrl = decodeURIComponent(href);
    const params = new URLSearchParams(decodedUrl);

    const typeParam = params.get('type')?.toLowerCase();
    const categoryParam = params.get('category')?.toLowerCase();

    const queryParam = decodeURIComponent(search.split('&')[0].split('=')[1]).toLowerCase();
    const [fullProperty, setFullProperty] = useState<IPropertyFull[]>([]);    

    function filterItems(items: IPropertyFull[], categoryParam: string | undefined, typeParam: string | undefined, queryParam: string): IPropertyFull[] {
        const qPramArr: any[] = queryParam.split(' ');
        function filterBy(item: IPropertyFull, by: string , value: string){
            if (item[by as keyof typeof  item]?.toLowerCase() === value.toLowerCase() ){
                return true;
            } else return false;
        }

        function checkQuery(item: IPropertyFull , queryParam: string) {
            // one word search
            if(qPramArr.length === 1) {
                if(item.title.toLowerCase().includes(queryParam) || item.description.toLowerCase().includes(queryParam) || item.address.city.toLowerCase().includes(queryParam) || item.address.zone.toLowerCase().includes(queryParam) || item.address.street.toLowerCase().includes(queryParam) || (item.tags.find(x => x.toLowerCase().includes(queryParam)) != null)){
                    return true;
                } else return false;

                // multiword search
            } else {

                let finds: number = 0;
                for ( const word of qPramArr ) {
                    if(item.title.toLowerCase().includes(word) || item.description.toLowerCase().includes(word) || item.address.city.toLowerCase().includes(queryParam) || item.address.zone.toLowerCase().includes(queryParam) || item.address.street.toLowerCase().includes(queryParam) || (item.tags.find(x => x.toLowerCase().includes(word)) != null) || item.address.city.toLowerCase().includes(word) || item.address.zone.toLowerCase().includes(word) || item.price === Number(word) ){
                        finds += 1;
                    }
                }
                // tolerance
                if (finds > qPramArr.length/4 ) {
                    return true;
                } else return false;
            } 
        }
        
        const ret: IProperty[] = [];
        for (const item of items) {
            const hasType = filterBy(item,'type', typeParam);
            const hasCategory = filterBy(item,'category', categoryParam);
            if (hasType && hasCategory) {
                const hasQuery = checkQuery(item, queryParam);
                    if (hasQuery)  ret.push(item);
            } 
        }

        return ret;

    }

    useEffect(() => {
            const result = filterItems(properties, categoryParam, typeParam, queryParam)
            setFoundAndFiltered(result);
            setFound(properties);
      
    }, [])

    

    
    const notFound = foundAndFiltered.length === 0;

    useEffect(() => {
      if(notFound){
        setFullProperty(found);
      } else {
        setFullProperty(foundAndFiltered);
      }
    }, [found, foundAndFiltered])
    
  return (
    <Layout  title='search' description='search page'>
        <Suspense fallback={<h1 className='px-4'>Loading...</h1>}>
            
            <Section padding='y' display='flex' className='flex-col ' >
                {notFound ? (
                    <Text className='px-4' size='lead'>No results found :(</Text>
                ) : null}
                <div className='mt-4'>
                {fullProperty?.length > 0 ? (
                    <div className='flex flex-col'>
                        { !notFound ?  <Text className='px-4' as="span" size={'lead'} fontWeight={'light'}>Showing results for: &quot;<Text  as="span" size={'lead'} fontWeight='semibold'>{queryParam}</Text>&quot;. </Text> : <Text className='px-4'>Explore our Catalogue</Text>}
                        <Grid  className='mt-10 px-2'>
                        {fullProperty?.map(item => {
    
                            return (
                              
                                <PropertyCard item={item} key={item?._id} />
                                
                            )
                        })}
                        </Grid>
                    </div>
                ): (
                    'Loading...'
                  
                )}
                </div>
            </Section>
            </Suspense>
        
        

    </Layout>
  )
}

export default Search

function PropertyCard({item}: {item: IPropertyFull}){

    const address = `${item?.address?.street_number}, ${item?.address?.street}, ${item?.address?.city}, ${item?.address?.zone}, ${item?.address?.country}`;
    return(
        <Link  href={`/property/${item?.slug.current}` } className='flex flex-col  gap-4 justify-between items-center rounded bg-tertiary/10 p-2 w-fit hover:border-primary hover:border-[1px]' >
            <div className='object-cover w-full  ' >
               { item?.images?.images !== null ? (<img className='w-full rounded-lg' width={'auto'} height={'auto'}  src={urlFor(item?.images?.images?.image)} alt={item?.images?.images?.alt_text} /> ): null}
            </div>
            
            <div className='w-full flex justify-between gap-4' >
            
                <div className=' w-full flex flex-col justify-start gap-2 text-left'>
                    <Text size='small'>{item?.category}</Text>
                    <Text size='general' fontWeight='bold'  >{item?.title}</Text>
                    <Text size='small' className='text-black/40'>{address}</Text>
                    <CountsDisplay item={item} />
                </div>
                <Text size='general' fontWeight='semibold' className='text-primary'>${item?.price}</Text>

                
            </div>
            

        </Link>
    )
}


export function CountsDisplay({item}: {item: IPropertyFull}): JSX.Element {

    const countInfoStyles = 'flex justify-center gap-1 items-center';
    return (
        <div className='flex justify-between w-24 '>
            <div className={countInfoStyles}>
                <IconBed />
                <Text  size='small'>{item?.bedroom_count}</Text>
            </div>
            <div className={countInfoStyles}>
                <IconBath className='h-5 w-5' />
                <Text size='small'>{item?.bathroom_count}</Text>
            </div>
        </div>
    )
}