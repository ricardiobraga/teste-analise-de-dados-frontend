import { useState, useEffect } from "react";
import axios from 'axios';

 function useFetch(url){
  
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    useEffect( () => {

        setLoading(true);
        axios.get(url)
        .then( (res) => {            
            setData(res.data)
            console.log("data");
        })
        .catch( (err) => {
            setError(err);
        })
        .finally( () => {
            setLoading(false);
        })

    }, [url] )

    return { data, loading, error}

    // useEffect( async () => {

    //     fetch(url)
    //     .then(res => {
    //       if(!res.ok) {throw res}
    //       return res.json()
    //     })    
    //     .then(res => setData(res)) 

    // }, [url] )

    // return { data, loading, error}

}

export default useFetch;