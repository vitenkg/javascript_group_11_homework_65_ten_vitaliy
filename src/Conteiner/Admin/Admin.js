import React, {useEffect, useState} from 'react';
import axiosApi from "../../AxiosApi";
import {SELECT_URL} from "../../config";

const Admin = ({history}) => {
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
            if (pageSelected) {
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
            }))}
        };
        fetchDataLoad().catch(console.error);
    }, [pageSelected]);


    const onSubmitHandle = async e => {
        e.preventDefault();
        await axiosApi.patch('/pages/' + pageSelected + '.json', {
            title: selectedPageData.title,
            content: selectedPageData.content
        })
        history.push('/');
    };

    const onHandleSelect = e => {
        e.preventDefault()
        console.log(e.target.value);
        setPageSelected(e.target.value);
    };

    const onChangeHandler = e => {
        const {name, value} = e.target
        e.preventDefault();
        console.log('change');
        setSelectedPageData(prev => ({
            ...prev,
            [name]: value
        }))
    };

    console.log(loadPages);
    console.log(selectedPageData);

    return (
            <form onSubmit={(e) => onSubmitHandle(e)}>
                <fieldset>
                    <legend>Редактирование страницы</legend>

                    <label>
                        <p>
                        Выберите страницу
                        </p>
            <select
                value={loadPages.page}
                name="page"
                onChange={onHandleSelect}
            >
                <option value='' disabled selected>Выберите</option>
                {loadPages.map(page => (
                    <option
                        key={page.id}
                        value={page.id}
                    >
                        {page.page}
                    </option>
                ))}

            </select>
                    </label>
            <p>
                <input
                    type="text"
                    name="title"
                    value={selectedPageData.title}
                    onChange={onChangeHandler}
                />
            </p>
            <p>
            <textarea
                name="content"
                value={selectedPageData.content}
                rows="20"
                cols="90"
                onChange={onChangeHandler}
            >
            </textarea>
            </p>
                        <button type="submit">Редактировать</button>
                </fieldset>
            </form>

);
};

export default Admin;