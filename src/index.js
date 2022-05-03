import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import Search from "./components/Search";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/r-strawser/cast-factory-inc",
  cache: new InMemoryCache()
});

function FunctionCalls() {
  const { loading, error, data } = useQuery(gql`
    {
        functionCallLogs {
            id
            methodName
            args
            deposit
            outcomeLogs
            eventName
            eventStandard
            signerId
            predecessordId
            receiverId
            blockHash
            blockHeight
            blockTimestamp
        }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

//   return data.functionSearch.map(({ id, methodName }) => (
//     <div key={id}>
//       <p>
//         {id}: {methodName}
//       </p>
//     </div>
//   ));
return data.functionCallLogs.map(({ id,
    methodName,
    args,
    deposit,
    outcomeLogs,
    eventName,
    eventStandard,
    signerId,
    predecessordId,
    receiverId,
    blockHash,
    blockHeight,
    blockTimestamp }) => (
    <div key={id}>
        <br></br>
        <h4>Receipt ID</h4>
      <p>
        Receipt: {id}
      </p>
      <p>
        methodName: {methodName}
      </p>
      <p>
        args: {args}
      </p>
      <p>
        outcomeLogs: {outcomeLogs}
      </p>
      <p>
        blockTimestamp: {blockTimestamp}
      </p>
      <br></br>
    </div>
  ));
}


function FunctionSearch() {
//     const SEARCH_QUERY = gql`
//     query functionSearch($methodName: String!) {
//         functionCallLog(filter: $methodName) {
//             id
//             methodName
//         }
//     }
// `;
//     const { loading, error, data } = useQuery(SEARCH_QUERY, {
//         variables: {
//             methodName: filter
//         },
//     });

    const { loading, error, data } = useQuery(gql`
      {
          functionSearch(text: "nft_approve") {
              id
              methodName
              
          }
      }
    `);


  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
  //   return data.functionSearch.map(({ id, methodName }) => (
  //     <div key={id}>
  //       <p>
  //         {id}: {methodName}
  //       </p>
  //     </div>
  //   ));
  return data.functionSearch.map(({ 
      id,
      methodName }) => (
      <div key={id}>
          <br></br>
          <h4>Receipt ID</h4>
        <p>
          Receipt: {id}
        </p>
        <p>
          methodName: {methodName}
        </p>
        <br></br>
      </div>
    ));
  }



function App() {
  return (
    <div>
      <h2>408 - NEAR Contract Explorer App 🚀</h2>
      <FunctionCalls />
      {/* <FunctionSearch /> */}
      <Search />
    </div>
    
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
