import React, { useEffect, useState } from 'react'
import "./fetchData.scss"
import moment from 'moment'
import axios from "axios"

const FetchData = ({ cat }) => {

    const [data, setData] = useState("")
   
    const fetchData = async () => {
        await axios
            .get(
                cat
                    ?
                    `http://newsapi.org/v2/top-headlines?country=in&pagesize=5&category=${cat}&apiKey=76e4a71e8e4448ba9e7a6fa7ee14228d`
                    : "http://newsapi.org/v2/top-headlines?country=us&pagesize=5&apiKey=76e4a71e8e4448ba9e7a6fa7ee14228d"
            )
            .then((res) => setData(res.data.articles))
            
    };

    useEffect(() => {
        fetchData();

    }, [cat]);

   

    return (
        
        <div className='cards-wrapper d-flex flex-row flex-wrap '>
            {
                data ? data.map((items, index) =>
                
                    <>

                        <div className="card" style={{ width: "20rem" }}>

                            <div className='card-body'>
                                <h5 className='card-title'>
                                    {items.title}
                                </h5>
                                <div className="card-img-div ">
                                    <img
                                        src={items.urlToImage}
                                        alt='image not found'
                                        className='card-img-top'
                                    />
                                </div>

                                <p className='card-text' >{ items.description} </p>
                                 
                                <p className='date-format'>Date : {moment().format(" Do MMM YYYY")}</p>
                                {/* <p>{new Date("2018-01-01T00:00:00")}</p> */}
                                <p className='sources'>Source : {items.source.name}</p>
                                <a className='card-link' href={items.url} target='blank'>Read Full Article</a>
                            </div>

                        </div>

                    </>
                ) : "Loading..."}

        </div>
    )
}

export default FetchData
