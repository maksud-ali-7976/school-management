import React from "react";

const ProfilePage = () => {
  return (
    <>
      <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 mb-0">
        <div className="flex-auto p-6">
          <div className="flex flex-wrap ">
            <div className="md:w-full pr-4 pl-4">
              <div className="profile-view">
                <div className="profile-img-wrap">
                  <div className="profile-img">
                    <a href="#">
                      <img
                        alt=""
                        src="https://smarthr.dreamguystech.com/smarthr-laravel/light/public/assets/img/profiles/avatar-02.jpg"
                      />
                    </a>
                  </div>
                </div>
                <div className="profile-basic">
                  <div className="flex flex-wrap ">
                    <div className="md:w-2/5 pr-4 pl-4">
                      <div className="profile-info-left">
                        <h3 className="user-name m-t-0 mb-0">John Doe</h3>
                        <h6 className="text-gray-700">UI/UX Design Team</h6>
                        <small className="text-gray-700">Web Designer</small>
                        <div className="staff-id">Employee ID : FT-0001</div>
                        <div className="text-xs doj text-gray-700">
                          Date of Join : 1st Jan 2013
                        </div>
                        <div className="staff-msg">
                          <a
                            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline btn-custom"
                            href="https://smarthr.dreamguystech.com/smarthr-laravel/light/public/chat"
                          >
                            Send Message
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-3/5 pr-4 pl-4">
                      <ul className="personal-info">
                        <li>
                          <div className="title">Phone:</div>
                          <div className="text">
                            <a href="">9876543210</a>
                          </div>
                        </li>
                        <li>
                          <div className="title">Email:</div>
                          <div className="text">
                            <a href="">johndoe@example.com</a>
                          </div>
                        </li>
                        <li>
                          <div className="title">Birthday:</div>
                          <div className="text">24th July</div>
                        </li>
                        <li>
                          <div className="title">Address:</div>
                          <div className="text">
                            1861 Bayonne Ave, Manchester Township, NJ, 08759
                          </div>
                        </li>
                        <li>
                          <div className="title">Gender:</div>
                          <div className="text">Male</div>
                        </li>
                        <li>
                          <div className="title">Reports to:</div>
                          <div className="text">
                            <div className="avatar-box">
                              <div className="avatar avatar-xs">
                                <img
                                  src="https://smarthr.dreamguystech.com/smarthr-laravel/light/public/assets/img/profiles/avatar-16.jpg"
                                  alt=""
                                />
                              </div>
                            </div>
                            <a href="smarthr-laravel/light/public/profile">
                              Jeffery Lalor
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="pro-edit">
                  <a
                    data-bs-target="#profile_info"
                    data-bs-toggle="modal"
                    className="edit-icon"
                    href="#"
                  >
                    <i className="fa fa-pencil" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
