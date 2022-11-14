import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

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

  useEffect(() => {
    callRestApi().then(
      result => setApiResponse(result));
  }, []);
  return(
    <div>
      <h1>{apiResponse.title}</h1>
      {/* <p>{JSON.stringify(apiResponse)}</p> */}
      <img
      src={apiResponse.img}
      alt={apiResponse.alt}/>
    </div>
  );
}
//const myelement = <h1><u>These are the details of myelement const</u></h1>;

ReactDOM.render(
  <RenderResult/>,
  document.querySelector('#root')
);