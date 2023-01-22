import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

const restEndpoint = "http://localhost:5001/getData/";

const callRestApi = async () => {
  const response = await fetch(restEndpoint);
  const jsonResponse = await response.json();
  console.log(jsonResponse);
  return jsonResponse;
  //return React.createElement('h1', null, JSON.stringify(jsonResponse));
};

//callRestApi();
function RenderResult() {
  const [apiResponse, setApiResponse] = useState("*** now loading... ***");
  let createdOnMonth = apiResponse.month;
  if (createdOnMonth < 10){
    createdOnMonth = "0"+createdOnMonth;
  }
  let createdOnDay = apiResponse.day;
  if (createdOnDay < 10){
    createdOnDay = "0"+createdOnDay;
  }
  const createdOnDate = apiResponse.year+"-"+createdOnMonth+"-"+createdOnDay;
  useEffect(() => {
    callRestApi().then(
      result => setApiResponse(result));
  }, []);
  return(
    <div class="container">
      <h1>Daily Random XKCD Comic</h1>
      <h2>"{apiResponse.title}" (#{apiResponse.num})</h2>
      <div class="innerContent">
        {/* <p>{JSON.stringify(apiResponse)}</p> */}
        <img src={apiResponse.img} alt={apiResponse.alt}/>
      </div>
      <h3>Created on: {createdOnDate}</h3>
      <div class="innerContent">
        <div class="btn expand purple">
          <span class="text">Add To Favorites</span>
        </div>
      </div>
    </div>
  );
}
//const myelement = <h1><u>These are the details of myelement const</u></h1>;

ReactDOM.render(
  <RenderResult/>,
  document.querySelector('#root')
);