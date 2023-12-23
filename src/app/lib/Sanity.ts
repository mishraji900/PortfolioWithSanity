import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
export const client = createClient({
    projectId:'lhmhy7an',
    dataset:'production',
    apiVersion:'2022-03-25',
    token:process.env.SANITY,
    useCdn:true
});

const builder = imageUrlBuilder(client)

export function urlFor(source:any) {
    return builder.image(source);
}