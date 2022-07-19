import { Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { v4 as uuid } from "uuid"
import TableComponent from '../Components/TableComponent';

const Homepage = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getArticles = () => {
        setLoading(true)
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/user/articles`
        })
            .then((res) => {
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setError(true)
                setLoading(false)
            })
    }

    useEffect(() => {
        getArticles()
    }, [])
    return (
        <div>
            <h1>All users Articles</h1>
            {loading ?
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size={'xl'}
                /> :

                error ? <h1>fetching error while getting articles</h1> :

                    <TableComponent key={uuid()} data={data} />

            }
        </div>
    )
}

export default Homepage