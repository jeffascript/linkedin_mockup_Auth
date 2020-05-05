import React, { useState, useEffect } from "react";
import "../module_css/index.css";

// { imageUrl, _id, firstname, surname, username } { allLike, numberOfLikes }

const RatingsAvatar = ({ numberOfLikes, allLikes }) => {


  return (
    <>
      <div className="avatar-group">
        {allLikes
          ? allLikes.length < 5 &&
            allLikes.map(({ likedBy: { _id, imageUrl } }) => (
              <div key={_id} className="avatar">
                <img
                  src={imageUrl}
                  alt="avatar"
                  className="avatar-img rounded-circle border border-white"
                />
              </div>
            ))
          : null}

        {allLikes
          ? allLikes.length > 4 &&
            allLikes.slice(0, 4).map(({ likedby: { _id, imageUrl } }) => (
              <>
                <div key={_id} className="avatar">
                  <img
                    src={imageUrl}
                    alt="avatar"
                    className="avatar-img rounded-circle border border-white"
                  />
                </div>
                <span className="text-black-50"> + {numberOfLikes - 4}</span>{" "}
              </>
            ))
          : null}
      </div>

      {/* <div className="avatar-group">
<div className="avatar">
		<img src="http://localhost:7000/images/ds18:57:50.643Z.png" alt="..." className="avatar-img rounded-circle border border-white"/>
        </div>

         <div className="avatar">
		<span className="avatar-title rounded-circle border border-white">CF</span>
	</div> 
    </div> */}
    </>
  );
};

export default RatingsAvatar;