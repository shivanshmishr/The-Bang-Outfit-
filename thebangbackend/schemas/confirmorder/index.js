export default {
    name: 'confirmedOrder',
    title: 'Confirmed Order',
    type: 'document',
    fields: [
      {
        name: 'orderNumber',
        title: 'Order Number',
        type: 'string',
        validation: (Rule) => Rule.required().unique(),
      },
      {
        name: 'products',
        title: 'Ordered Products',
        type: 'array',
        of: [
          { 
            type: 'object',
            fields:[
              {
                name:'producttitle',
                title:'Product Title',
                type:'reference',
                to:[{type:'product'}],
              },
              {
                name:'productimage',
                title:'Product Image',
                type:'reference',
                to:[{type:'product'}],
              },
              {
                name:'finalproductprice',
                title:'Product Image',
                type:'reference',
                to:[{type:'product'}],
              },
              {
                name:'productquantity',
                title:'Product Quantity',
                type:'number'
              },
              {
                name:'selectedsize',
                title:'Selected Size',
                type:'string'
              }
            ]
          }
        ],
      },
      {
        name: 'totalPrice',
        title: 'Total Price in (Rs.)',
        type: 'number',
      },
      {
        name: 'orderDate',
        title: 'Order Date',
        type: 'datetime',
        validation: (Rule) => Rule.required(),
      },
      {
        name:'customerdetails',
        title:'Customer Details',
        type:'object',
        fields:[
          {
            name:'customername',
            title:'Name',
            type:'string'
          },
          {
            name:'customeremail',
            title:'Email',
            type:'email'
          },
          {
            name:'customermobilenumber',
            title:'Mobile Number',
            type:'number'
          },
          {
            name:'customeraddress',
            title:'Delivery Address',
            type:'string'
          },
          {
            name:'customerzipcode',
            title:'Pincode',
            type:'number'
          },
          {
            name:'customercity',
            title:'City',
            type:'string'
          },
          {
            name:'customerstate',
            title:'State',
            type:'string'
          },
          {
            name:'customercountry',
            title:'Country',
            type:'string'
          },
        ]
      },
      {
        name:'deliverydate',
        title:'Estimated Delivery Date',
        type:'datetime'
      },
      {
        name:'orderstatus',
        title:'Order Status',
        type:'string',
        options:{
          list:[
            {title:'Processing', value:'processing'},
            {title:'Dispatch', value:'dispatch'},
            {title:'Delivered', value:'Delivered'},
          ]
        }
      },
    ],
  };

  
  