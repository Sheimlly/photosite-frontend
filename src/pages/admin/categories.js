import axios from "axios";
import { useEffect, useState } from "react";

import { errorLogout } from './error_logout'
import { API_URL } from '../../constants/index'
import '../../styles/admin/categories.scss'

const AdminCategories = () => {
    const token = localStorage.getItem("token");

    const [categories, setCategories] = useState({data: []});
    const [category, setCategory] = useState({
        name: "",
    });

    const updateCategoryState = (value, target) => {
        setCategory(previousValue => {
            return {...previousValue, [target]: value }
        })
    }

    const updateCategoriesName = (c_id, newName) => {
        const index = categories.data.findIndex(object => {
            return object.category_id === c_id;
        });

        if (index !== -1) {
            categories.data[index].name = newName;
        }
    };

    const getCategories = () => {
        axios.get(`${API_URL}/categories/`).then(res => {
            const data = res.data
            setCategories({ data: data });
        }).catch(function (error) {
            errorLogout(error);
        });
    }

    const addCategory = (e) => {
        e.preventDefault();
        axios.post(`${API_URL}/categories/add/`, {
            name: category.name,
            active: document.getElementById("add_category_checbox").checked ? true : false
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
            errorLogout(error);
        });
    };

    const deleteCategory = (category_id) => {
        axios.delete(`${API_URL}/categories/delete/${category_id}`, {
            headers: {
              'Authorization': 'Token ' + token
            }
        }).then(res => {
            console.log(res);
        })
        .then(function (response) {
            console.log(response);
            getCategories();
        })
        .catch(function (error) {
            errorLogout(error);
        });
    }

    const updateCategory = (category_id, newActive) => {
        // I think it could be done better

        const index = categories.data.findIndex(object => {
            return object.category_id === category_id;
        });
        const newName = categories.data[index].name;

        axios.put(`${API_URL}/categories/update/${category_id}`, {
            name: newName,
            active: newActive
        },{
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Token ' + token
            }
        })
        .then(function (response) {
            console.log(response);
            getCategories();
        })
        .catch(function (error) {
            errorLogout(error);
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
                                        <div className="category-block col-12 col-xxl-6 my-3">
                                            <h3 className="category-block__title mt-3">{c.name}</h3>

                                            {/* FIREFOX WHY */}
                                            <div className="category-block__change-name py-3">
                                                <input type="text" name="newName" placeholder="Zmień nazwę" onChange={(e) => updateCategoriesName(c.category_id, e.target.value)}/><button onClick={() => updateCategory(c.category_id, c.active)}>Zmień</button>
                                            </div>

                                            <p><span className={c.active ? 'green-dot' : 'red-dot'}></span> Aktywne: {c.active ? 'Tak' : 'Nie'}</p>

                                            <button type="button" className="active-button action-button" onClick={() =>updateCategory(c.category_id, c.active ? false : true)} >{c.active ? 'deaktywuj' : 'aktywuj'}</button>

                                            <div className="action-buttons d-flex justify-content-between mb-3">
                                                <button className="delete-button" onClick={() => deleteCategory(c.category_id)} >Usuń</button>
                                            </div>
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
                                        value={category.name}
                                        onChange={(e) => updateCategoryState(e.target.value, "name") }
                                        required
                                    />
                                </label>
                                <label>
                                    <span className='add_category-form__input-description'>Czy aktywna?</span>
                                    <input
                                        id="add_category_checbox"
                                        className='add_category-form__input add_category-form__input-actuve'
                                        type="checkbox"
                                    />
                                </label>

                                <button className='submit-button' type="submit">Dodaj kategorię <i className="icon-right" /></button>

                            </form>
                        </div>
                    </div>
                </div>


            </section>
        </>
    )
}

export default AdminCategories;