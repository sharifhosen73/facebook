import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const UserIntroModal = () => {
  const { user } = useContext(AuthContext);
  const handleEditProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const university = form.university.value;
    const college = form.college.value;
    const school = form.school.value;
    const from = form.from.value;
    const live = form.live.value;
    const information = {
      name: user.displayName,
      email: user.email,
      university,
      college,
      school,
      from,
      live,
    };
    console.log(information);
    fetch(
      "https://social-media-application-server-three.vercel.app/user-personal",
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(information),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        form.reset();
      });
  };
  return (
    <div>
      <input type="checkbox" id="userIntroModal" className="modal-toggle" />
      <label htmlFor="userIntroModal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-xl text-center mb-5 font-semibold">
            Edit Your Information{" "}
          </h3>
          <form onSubmit={handleEditProfile}>
            <input
              type="text"
              name="university"
              placeholder="University"
              className="input input-bordered w-full mt-2"
            />
            <input
              type="text"
              name="college"
              placeholder="College"
              className="input input-bordered w-full mt-2"
            />
            <input
              type="text"
              name="school"
              placeholder="School"
              className="input input-bordered w-full mt-2"
            />
            <input
              type="text"
              name="from"
              placeholder="Where are you come from?"
              className="input input-bordered w-full mt-2"
            />
            <input
              type="text"
              name="live"
              placeholder="Where do you live now?"
              className="input input-bordered w-full mt-2"
            />
            <div className="modal-action">
              <input
                type="submit"
                htmlFor="userIntroModal"
                className="btn w-full"
                value="Submit"
              />
            </div>
          </form>
        </label>
      </label>
    </div>
  );
};

export default UserIntroModal;
