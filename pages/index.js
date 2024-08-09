import { client } from "../lib/client";
import { Categories, HomeBanner } from "../components";
import React from 'react';
import { useSession, getSession } from "next-auth/react";

export default function Home({ categorys }) {

  const { data: session } = useSession();

  return (
    <div>
      <HomeBanner />

      <div className="w-[100%] mx-auto my-[3vh]">

        <h2 className="text-[3.6vh] text-[#fd6500] text-center font-semibold my-[2vh]">
          Explore Categories
        </h2>

        <div className="my-[2vh]">
          <div className=" flex flex-row flex-wrap justify-center items-center gap-[2vh]  p-[2vh]">
            {categorys?.map((category) => (
              <Categories key={category._id} category={category} />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export const getServerSideProps = async (context) => {

  const productquery = '*[_type == "product"]';
  const products = await client.fetch(productquery);

  const categoryquery = '*[_type == "category"]';
  const categorys = await client.fetch(categoryquery);

  const session = await getSession(context);
  let userdetails = null;

  if (session) {
    const user = session.user;
    const { email, name: fullName } = user;
    const [firstName, lastName] = fullName.split(' ');

    const userQuery = '*[_type == "userdetails" && emailid == $email]';
    userdetails = await client.fetch(userQuery, { email });

    if (userdetails.length > 0) {
      // User exists, update details
      try {
        await client.patch(userdetails[0]._id).set({
          firstname: firstName,
          lastname: lastName,
          // Update other fields here...
        }).commit();
      } catch (error) {
        console.error("Error updating user details:", error);
      }
    } else {
      
      try {
        await client.create({
          _type: "userdetails",
          emailid: email,
          firstname: firstName,
          lastname: lastName,
          // Other fields...
        });
      } catch (error) {
        console.error("Error creating user details:", error);
      }
    }
  }

  return {
    props: { 
      products, 
      categorys, 
      userdetails:userdetails || null 
    },
  };
}
