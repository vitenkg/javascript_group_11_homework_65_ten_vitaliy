import React, {useEffect, useState} from 'react';
import './Home.css';
import axiosApi from "../../AxiosApi";

const Home = ({match}) => {
    const [pages, setPages] = useState([]);

    useEffect(()=>{
        let url = '/pages.json';
        if (match.params.page) {
            url =`/pages/` + match.params.page + '.json';
        }
        const fetchData = async () => {
            let response = await axiosApi.get(url);
            if (match.params.page) {
                response.data = {
                 [match.params.page] : response.data
                };
            }
            const pagesBase = Object.keys(response.data).map(page => ({
                ...response.data[page],
                id: page
            }));
            setPages(pagesBase);
        };
        fetchData().catch(console.error);
    }, [match.params.page]);

    return (
        <div className="DisplayQuotes">
            <h3>SomeThing</h3>
            {pages.map(page => (
                    <div
                        key={page.id}
                        className="Quote"
                    >
                        <p className="Title">Автор: {page.title}</p>
                        <p>Описание: {page.content}
                        </p>
                    </div>
                )
            )
            }
        </div>
    );
};

export default Home;