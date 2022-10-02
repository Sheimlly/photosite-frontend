import axios from "axios";
import { useEffect, useState } from "react";

import { handleErrors } from '../handle_errors'
import { API_URL } from '../../constants/index'
import '../../styles/admin/categories.scss'

const AdminCategories = () => {
    const token = localStorage.getItem("token");


    // const [category, setCategory] = useState("")

    const [categories, setCategories] = useState({data: []});
    const [categoryName, setCategoryName] = useState("");

    const getCategories = () => {
        axios.get(`${API_URL}/categories/`).then(res => {
            const data = res.data
            setCategories({ data: data });
        }).catch(function (error) {
            handleErrors(error);
        });
    }

    const addCategory = (e) => {
        e.preventDefault();
        axios.post(`${API_URL}/categories/`, {
            name: categoryName
        },{
            headers: {
              'Authorization': 'Token ' + token
            }
         })
        .then(function (response) {
            console.log(response);
            getCategories();
        })
        .catch(function (error) {
            handleErrors(error);
        });
    };



    // const updateCategory = (category_id) => {
    //     axios.put(`${API_URL}/categories/${category_id}`, {
    //         name: category
    //     },{
    //         headers: {
    //           'Authorization': 'Token ' + token
    //         }
    //     })
    //     .then(function (response) {
    //         getCategories();
    //     })
    //     .catch(function (error) {
    //         handleErrors(error);
    //     });
    // }

    const deleteCategory = (category_id) => {
        axios.delete(`${API_URL}/categories/${category_id}`, {
            headers: {
              'Authorization': 'Token ' + token
            }
        })
        .then(function (response) {
            getCategories();
        })
        .catch(function (error) {
            handleErrors(error);
        });
    }

    useEffect(() => {
        getCategories();
    }, [])

    return(
        <>
            <header>
                <div className="container">
                    <h1>Kategorie</h1>
                </div>
            </header>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-12 order-2 order-md-1 col-md-6 mt-5 mt-md-0">
                            <h2>Kategorie:</h2>
                            <div className="row justify-content-between pe-md-4">
                                {
                                categories.data
                                    .map(c =>
                                        <div className="category-block col-12 col-xxl-6 my-3 d-flex justify-content-between">
                                                <h3 className="category-block__title">{c.name}</h3>
                                                {/* <form onSubmit={() => updateCategory(c.category_id)}>
                                                    <input
                                                        type="text"
                                                        placeholder="nazwa"
                                                        onChange={(e) => setCategory(e.target.value) }
                                                        required
                                                    />
                                                    <button className='submit-button' type="submit">Zmień kategorię <i className="icon-right-small" /></button>
                                                </form> */}
                                                <button className="delete-button" onClick={() => deleteCategory(c.category_id)} >Usuń <i className="icon-cancel"/></button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-12 order-1 order-md-2 col-md-6 ps-md-5 mb-5 mb-md-0">
                            <h2>Dodaj kategorię</h2>
                            
                            <form onSubmit={addCategory} className="add_category-form d-flex flex-column">
                                <label>
                                    <span className='add_category-form__input-description'>Nazwa*</span>
                                    <input
                                        className='add_category-form__input add_category-form__input-name'
                                        type="text"
                                        placeholder='Nazwa*'
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value) }
                                        required
                                    />
                                </label>

                                <button className='submit-button' type="submit">Dodaj kategorię <i className="icon-right-small" /></button>

                            </form>
                        </div>
                    </div>
                </div>


            </section>
        </>
    )
}

export default AdminCategories;