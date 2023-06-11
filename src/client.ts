// import SanityClient from 'next-sanity-client';

// export const sanityClient = new SanityClient({
//     projectId: process.env.SANITY_PROJECT_ID,
//     dataset: process.env.SANITY_DATASET,
//     useCdn: process.env.NODE_ENV === 'production',
//   });

import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { type ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { type SanityImageSource } from '@sanity/image-url/lib/types/types';


export const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2023-03-01',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN ,
})

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: SanityImageSource): ImageUrlBuilder => builder.image(source);