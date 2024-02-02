import React from "react";
import Card from "react-bootstrap/Card";
import { BASE_URL } from "../services/helper";
import moment from 'moment';


const CardNews = (props) => {
  // const datetime = moment.(`${userdata.datecreated}`).formate('MMMM DO YYYY');
  return (
    <>
      {/* {userdata.length > 0 ? (   <div className="grid-wrapper">{
        userdata.map((element, index) => {
          return (
            <> */}
             
              <Card className="shadow mt-5" style={{width: "18rem"}}>
                <div className="my-4 mx-2 me-2">
                  <div className="card">
                    <div
                      // style={{
                      //   display: "flex",
                      //   justifyContent: "flex-end",
                      //   position: "absolute",
                      //   right: "0",
                      // }}
                    >
                      <span
                      
                        style={{ 
                        left: "90%", zIndex: "1",
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "absolute",
                        right: "0",
                      }}
                      
                      >
                        <h6   className="badge rounded-pill bg-danger">{props.category}</h6>
                      </span>
                    </div>

                    <img className="card-img-top my-2 card-image-container" src={`${BASE_URL}/uploads/${props.profile}`} alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{props.title}</h5>
                      <p className="card-text">{props.description}...</p>
                      <p className="card-text">
                        <small className="text-muted">By : {props.authorname} </small>
                      </p>
                      <p className="card-text">
                        <small className="text-muted">{props.countryname} </small>
                      </p>
                      <p className="card-text">
                        <small className="text-muted">{moment(props.datecreated).format('MMMM Do YYYY')}</small>
                      </p>
                      <a
                        href="#"
                        target="_blank"
                        className="btn btn-secondary md-2"
                      >
                        {props.url_news}
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

            </>
    //       );
    //     })}</div>
    //   ): (
    //       <div className="no_data text-center">News Not Found</div>
    //   )};
    // </>
  );
};

export default CardNews;
