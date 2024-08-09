import { typed, validation } from "sanity";

export default{
    name:'category',
    title:'Category',
    type:'document',
    fields:[
        {
            name:'Title',
            title:'Title',
            type:'string',
            validation:Rule=>Rule.required(),
        },
        {
            name:'slug',
            title:'Slug',
            type:'slug',
            options:{
                source:'Title',
                maxLength:200,
                slugify:input=>input.toLowerCase().replace(/\s+/g, '-').slice(0,200)
            },
        },
        {
            name:'image',
            title:'Category Image',
            type:'image',
            options:{
                hotspot:true,
                crop:true
            },
        },
        {
            name:'trending',
            title:'Trending Detail',
            type:'string'
        },
        {
            name:'gender',
            title:'Gender',
            type:'string',
            options:{
                list:[
                    { title: 'Men', value: 'men' },
                    { title: 'Women', value: 'women' },
                    { title: 'Unisex', value: 'unisex' },
                ]
            },
            validation: Rule => Rule.required(),
        },
    ],
};