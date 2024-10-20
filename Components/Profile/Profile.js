import React from "react";
import AddProfileForm from "./AddProfileForm";
import ProfileLists from "./ProfileLists";

const Profile = () => {
  return (
    <div className="">
      <h1>Profiles</h1>
      <div className="row">
        
            <AddProfileForm />
        
        
            <ProfileLists/>
        
      </div>
    </div>
  );
};

export default Profile;
