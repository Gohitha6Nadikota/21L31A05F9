import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MainContainer = () => {
    const [info,setInfo]=useState([]);
    const fetchData=async(company,category,n,start,end)=>{
        const url = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${n}&minPrice=${start}&maxPrice=${end}`;
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxOTc1MjYzLCJpYXQiOjE3MjE5NzQ5NjMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImIxYzJhNjRkLTVkYjItNGE1NS1iZTBhLTFmNjU1YTA5MzMyMyIsInN1YiI6ImdvaGl0aGFwcml5YW5hZGlrb3RhQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IlJjbG9jayIsImNsaWVudElEIjoiYjFjMmE2NGQtNWRiMi00YTU1LWJlMGEtMWY2NTVhMDkzMzIzIiwiY2xpZW50U2VjcmV0IjoiZklrZnBOYktKaHVZbWhTdCIsIm93bmVyTmFtZSI6IkdvaGl0aGEgUHJpeWEgTmFkaWtvdGEiLCJvd25lckVtYWlsIjoiZ29oaXRoYXByaXlhbmFkaWtvdGFAZ21haWwuY29tIiwicm9sbE5vIjoiMjFMMzFBMDVGOSJ9.T8R4cGOgoCVvAUexCoH8pFkrjg8Ag3cepg7-yI-8shA",
            },
          });
          const data= response?.data || [];
          setInfo(data);
        } catch (error) {
          console.error("Error fetching", error);
          return ;
        }
    }
    useEffect(()=>{
        fetchData("AMZ","Laptop",10,1,10000);
    },[])
  return (
    <div>
        <h1>Products</h1>
        {info.map((e)=>{
            return(
            <div key={e.productName}>
                <h1>{e.productName}</h1>
                <h2>{e.price}</h2>
                <p>{e.availability}</p>
            </div>
            )
        })}
    </div>
  )
}

export default MainContainer;