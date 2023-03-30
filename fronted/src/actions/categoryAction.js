import {

    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,

    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_RESET,
    UPDATE_CATEGORY_FAIL,

    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_RESET,
    DELETE_CATEGORY_FAIL,

    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,

    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,

    CLEAR_ERRORS


} from '../constants/categoryConstants'

import axios from 'axios'

// create category action
export const createCategory = (name) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CATEGORY_REQUEST })
        console.log(name)

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/admin/add/category', name, config)
        console.log(data)
        dispatch({
            type: CREATE_CATEGORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}

//get category action
export const getCategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_CATEGORY_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/category/${id}`)

        dispatch({
            type: GET_CATEGORY_SUCCESS,
            payload: data.category
        })

    } catch (error) {
        dispatch({
            type: GET_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}


// get all categories action
export const getCategories = () => async (dispatch) => {
    try {
        dispatch({ type: GET_CATEGORIES_REQUEST })

        const { data } = await axios.get('/api/v1/admin/categories')

        dispatch({
            type: GET_CATEGORIES_SUCCESS,
            payload: data.categories
        })

    } catch (error) {
        dispatch({
            type: GET_CATEGORIES_FAIL,
            payload: error.response.data.message
        })
    }
}

// delete category action
export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/category/${id}`)

        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}

// update category action
export const updateCategory = (id, name) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CATEGORY_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/category/${id}`, {name}, config)

        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}

// clear errors action
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}