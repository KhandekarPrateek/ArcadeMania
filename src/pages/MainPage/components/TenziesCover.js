import React from "react";
import Monster from "../../../assets/Monster-tenzies.png";
const TenziesCover = () => {
  return (
    <div className="TenziesContanier pt-3">
      <img
        src={Monster} //put tenzies image later
        alt="TenziesImage"
        className="TenziesImage  h-100 d-flex w-50  "
      />
      <div className="TenziesContent  w-50 d-flex  h-100 ">
        <div className="container ">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="fs-1 bg-primary p-3">TENZIES</h1>
              <h3 className="bg-secondary p-3">RULES</h3>
              <p className="p-5 m-5">
                The rules of tenzies game are quite simple but we have updated
                it to include monster faces.Your goal is to select the same
                monster in the least of rolls{" "}
              </p>
              <button type="button" className="btn btn-dark col-2">
                Play tenzies
              </button>
            </div>
          </div>
        </div>

        {/* insert a router or whatever here to get the job done  */}
      </div>
    </div>
  );
};

export default TenziesCover;
