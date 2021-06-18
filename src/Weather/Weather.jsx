import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function WeatherSearch() {
    const [city, setCity] = useState('');
    const dispatch = useDispatch();

    function searchGiphy() {
        console.log(searchid);

        axios.get(`/api/giphy/${searchid}`).then((response) => { // axios GET to the server to get the giphy api
            const giphArray = (response.data.data);

            console.log(giphArray);

            dispatch({ // dispatches data from the axios to a reducer
                type: 'GIPHY_REDUCER',
                payload: giphArray
            });

            setSearchid('');

        }).catch((error) => {
            alert('Error getting gifs');
            console.log(error);
        })
    }



    //1. [x]need an input field/form
    //1.1 dispatch to reducer/store (via saga)
    //1.2 dispatch({type: 'FETCH_SEARCH', payload: search})
    //2. [x]button to 'search' 

    return (

        <div>
            <input onChange={(event) => setSearchid(event.target.value)} value={searchid} type="text" placeholder="Search Giphy" ></input>
            <button onClick={() => searchGiphy()} >Search</button>
        </div>


    );
}

export default Search;

{/*
So, rereading the giphy api for search, what needs to be done is a use of params.
What can be done is to use an axios GET (like from the search results), but adding a
param.
url: `/api/giphy/{searchid}`
set searchid to whatever is in the input and then call the axios GET.
This will allow us to use the param in the server to get the specific gifs.
*/}