import React, {useState} from 'react';
import {gql, useLazyQuery} from '@apollo/client';

const FEED_SEARCH_QUERY = gql`
    query ($text: String) {
        functionSearch(text: $text) {
            id
            methodName
        }
    }
`;

const Search = () => {
  const [searchFilter, setSearchFilter] = useState('');
  //console.log(data.)
  const [executeSearch, {data}] = useLazyQuery(
    FEED_SEARCH_QUERY
  );

  return (
    <>
      <div>
        Search
        <input
          type="text"
          onChange={(e) => {setSearchFilter(e.target.value)
          
          }}
        />
        <button
          onClick={() => { executeSearch({variables: {text: searchFilter}})
          
          console.log(searchFilter)}}>
          OK
        </button>
      </div>
      {data &&
      data.functionSearch.map((id, methodName) => (
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
      ))}
    </>
  );
};

export default Search;