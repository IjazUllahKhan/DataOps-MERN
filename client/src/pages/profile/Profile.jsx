import React from "react";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <h1>profile</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, et?
        Ratione, asperiores soluta voluptas velit possimus accusantium culpa
        blanditiis officia ipsum eveniet voluptatibus, maiores cum quo
        molestiae! Neque, corporis voluptas.
      </p>
      <Outlet />
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
        dolorem, vero ex autem ea, sequi nam omnis error beatae earum aut
        perferendis numquam molestias repellat consequuntur ratione quaerat
        fuga. Sunt.
      </p>
    </div>
  );
};

export default Profile;
