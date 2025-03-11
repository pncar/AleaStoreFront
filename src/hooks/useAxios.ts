import axios from "axios";
import { useState, useEffect } from "react";

const useAxios = (url:string, method: "get" | "post" = "get") => {
    const [data,setData] = useState(null);

    const fetchData = () => {
        axios[method](url)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setData(data);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    useEffect(()=>{
        fetchData();
    },[url]);

    return [data];
}

export default useAxios;

// For future updates, currently not using this.