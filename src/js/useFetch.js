import axios from "axios";
import { useState } from "react";

const useFetch = (url) => {

    const [apiData, setApiData] = useState();   
    
    const getApi = () => {
        axios.get(url)
            .then((res) => setApiData(res.data))
            .catch((err) => console.log(err))
            .finally(console.log(apiData));
    }

    return [apiData, getApi];
}

export default useFetch