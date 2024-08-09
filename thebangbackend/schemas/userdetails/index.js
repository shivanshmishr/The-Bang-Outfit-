import { validation } from "sanity";

export default {
  name: 'userdetails',
  title: 'User Details',
  type: 'document',
  fields: [
    {
      name: 'firstname',
      title: 'First Name',
      type: 'string',
      validation:(Rule)=>Rule.required().unique(),
    },
    // {
    //     name: 'userprofilepic',
    //     title: 'User Profile Image',
    //     type: 'image',
    //     options: {
    //       hotspot: true,
    //       crop: true
    //     }
    // },
    {
      name: 'lastname',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required().unique(),
    },
    {
      name: 'mobilenumber',
      title: 'Contact Number',
      type: 'string',
    },
    {
      name: 'emailid',
      title: 'Email',
      type: 'string',
      validation: (Rule) =>Rule.required().email({ message: 'Please enter a valid email address' }),
    },
    {
      name: 'alternatemailid',
      title: 'Alternate Email ID',
      type: 'string',
      validation: (Rule) => Rule.required().email({ message: 'Please enter a valid email address' }),

    },
    {
      name: 'streetaddress',
      title: 'Flat No./Street Address',
      type: 'string',
    },
    {
      name: 'zipcode',
      title: 'Pincode/ZipCode',
      type: 'string',
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
    },
    {
      name: 'state',
      title: 'State',
      type: 'string',
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
    },
    
  ],
}
