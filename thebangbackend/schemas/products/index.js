export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'productitle',
      title: 'Product Title',
      type: 'string',
    },
    {
      name:'slug',
      title:'Slug',
      type:'slug',
      options:{
        source:'productitle',
        maxLength:200,
        slugify:input=>input.toLowerCase().replace(/\s+/g, '-').slice(0,200)
      },
      validation:Rule=>Rule.required(),
    },
    {
      name: 'productimage',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
        crop: true,
      },
    },
    {
      name:'productvarieties',
      title:'Product Varieties',
      type:'array',
      of:[
        {
          type:'image',
          options:{
            hotspot:true,
            crop:true
          },
        },
      ],
    },
    {
      name: 'productdesc',
      title: 'Product Description',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [{type: 'category'}],
    },
    {
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'Topwear', value: 'topwear' },
          { title: 'Bottomwear', value: 'bottomwear' },
          { title: 'FootWear', value: 'footwear' },
        ],
      },
    },
    {
      name:'availability',
      title:'Availability',
      type:'boolean',
      description:'Is the Product Available'
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
          { title: 'Kids', value: 'kids'}
        ]
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'finalproductprice',
      title: 'Final Product Price',
      type: 'number',
    },
    {
      name: 'cuttedproductprice',
      title: 'Cutted Product Price',
      type: 'number',
    },
    {
      name: 'size',
      title: 'Available in Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'S', value: 'S' },
          { title: 'M', value: 'M' },
          { title: 'L', value: 'L' },
          { title: 'XL', value: 'XL' },
          { title: 'XXL', value: 'XXL' },
        ],
      },
      hidden: ({ parent }) => parent.productType !== 'topwear',
    },
    {
      name: 'waistSize',
      title: 'Waist Size (in inches)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '28', value: '28' },
          { title: '32', value: '32' },
          { title: '34', value: '34' },
          { title: '36', value: '36' },
          { title: '38', value: '38' },
          { title: '40', value: '40' },
        ],
      },
      hidden: ({ parent }) => parent.productType !== 'bottomwear',
    },
    {
      name:'footwearuksize',
      title:'Foot Wear Size (in UK)',
      type:'array',
      of:[{type:'string'}],
      options:{
        list:[
          {title:'6', value:'6'},
          {title:'7', value:'7'},
          {title:'8', value:'8'},
          {title:'9', value:'9'},
          {title:'10', value:'10'},
          {title:'11', value:'11'},
        ]
      },
      hidden: ({parent})=> parent.productType !== 'footwear',
    },
    
  ],

}
