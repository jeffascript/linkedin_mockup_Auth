import React from "react";
import "../module_css/index.css";
import { Link } from "react-router-dom";

// { imageUrl, _id, firstname, surname, username } { allLike, numberOfLikes }

const RatingsAvatar = ({ numberOfLikes, allLikes, plusNumberReactions }) => {


  return ( 
    <>
      <div className="avatar-group">


        {allLikes
          ? allLikes.length <= 5 &&
            allLikes.map(({ likedBy: { _id, imageUrl, username } }) => (
                <div key={_id} className="avatar">
                <Link to={"/profile/" + username}><img
                  src={imageUrl}
                  alt="avatar"
                  className="avatar-img rounded-circle border border-white"
                /></Link>
              </div>
            ))
          : null}



        {allLikes
          ? allLikes.length > 5 &&
            allLikes.slice(0, 5)


            .map(one => (
              <>
                <div key={one.likedBy._id} className="avatar">
                <Link to={"/profile/" + one.likedBy.username}> <img
                    src={one.likedBy.imageUrl}
                    alt="avatar"
                    className="avatar-img rounded-circle border border-white"
                  /></Link>
                </div>
                



              </>
            )
          
            )
         
            
            // .map(({ likedby: { _id, imageUrl, username } }) => (
            //   <>
            //     <div key={_id} className="avatar">
            //     <Link to={"/profile/" + username}> <img
            //         src={imageUrl}
            //         alt="avatar"
            //         className="avatar-img rounded-circle border border-white"
            //       /></Link>
            //     </div>
            //     <span className="text-black-50"> + {numberOfLikes - 5}</span>{" "}



            //   </>
            // ))


          : null}




           {/* <span className="text-black-50"> + {numberOfLikes > 5 ? numberOfLikes - 5 : null}</span>  */}
           &nbsp;&nbsp;
           <span className=" text-black-50">{plusNumberReactions > 0 ? `+ ${plusNumberReactions}` : null}</span>
      </div>
      


 

      {/* <div className="avatar-group">
<div className="avatar">
		<img src="https://be-lnk.herokuapp.com/images/ds18:57:50.643Z.png" alt="..." className="avatar-img rounded-circle border border-white"/>
        </div>

         <div className="avatar">
		<span className="avatar-title rounded-circle border border-white">CF</span>
	</div> 
    </div> */}
    </>
  );
};

export default RatingsAvatar;
