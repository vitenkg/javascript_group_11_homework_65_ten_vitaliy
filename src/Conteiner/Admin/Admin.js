import React, {useEffect, useState} from 'react';
import axiosApi from "../../AxiosApi";
import {SELECT_URL} from "../../config";

const Admin = () => {
    const [loadPages, setLoadPages] = useState([]);
    const [pageSelected, setPageSelected] = useState('');
    const [selectedPageData, setSelectedPageData] = useState({
        id: '',
        title: '',
        content: ''
    });

    useEffect(() => {

        const fetchData = async () => {
            const response = await axiosApi.get(SELECT_URL);
            setLoadPages(Object.keys(response.data).map(key => ({
                id: key,
                page: key[0].toUpperCase() + key.substring(1)
            })));
        };
        fetchData().catch(console.error);
    }, []);

    useEffect(() => {
        const fetchDataLoad = async () => {
            const url = '/pages/' + pageSelected + '.json';
            console.log(url);
            const response = await axiosApi.get(url);
            console.log(response.data);
            const content = response.data.content;
            const title = response.data.title;
            setSelectedPageData(prev => ({
                ...prev,
                content: content,
                title: title,
                id: response.data.id
            }));
        };
        fetchDataLoad().catch(console.error);
    }, [pageSelected]);


    // const onSubmitHandle = e => {
    //     e.preventDefault();
    //     console.log('test', e);
    // }

    const onHandleSelect = e => {
        e.preventDefault()
        console.log(e.target.value);
        setPageSelected(e.target.value);
    }

    console.log(loadPages);
    console.log(selectedPageData);

    return (
        <div>
            <select
                value={loadPages.page}
                name="page"
                onChange={onHandleSelect}
            >
                {loadPages.map(page => (
                    <option
                        key={page.id}
                        value={page.id}
                    >
                        {page.page}
                    </option>
                ))}

            </select>
            <p>
                <input
                    type="text"
                    name="title"
                    value={selectedPageData.title}
                    // onChange={}
                />
            </p>
            <p>
            <textarea
                name="content"
                value={selectedPageData.content}
            >

            </textarea>
            </p>
        </div>
    );
};

export default Admin;