import React from "react";
import { client } from "../lib/client";
import { useSession, getSession, signIn, signOut } from "next-auth/react";

import { SignIn, AccountDetails, AccountSidebar } from "../components";

export default function myaccount() {
  const { data: session } = useSession();

  if (session) {
    const { user } = session;
    return (
      <div className="w-[90%] flex flex-col md:flex-row justify-evenly mx-auto  my-[10vh] ">
        <AccountSidebar />
        <AccountDetails user={user}/>
      </div>
    );
  } else {
    return (
      <div>
        <SignIn />
      </div>
    );
  }
}

export const getServerSideProps = async (context) => {
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
      userdetails: userdetails || null,
    },
  };
};