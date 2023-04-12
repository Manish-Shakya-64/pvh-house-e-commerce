import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_RESET,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
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
  CLEAR_ERRORS,
} from "../constants/categoryConstants";

// create category reducer

export const newCategoryReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST,
      UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        isCreated: action.payload.success,
        category: action.payload.category,
        message: action.payload.message,
      };

     case UPDATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload.success,
        message: action.payload.message,
      }; 

    case CREATE_CATEGORY_FAIL,
      UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_CATEGORY_RESET.
    UPDATE_CATEGORY_RESET: {
      return {
        ...state,
        success: false,
        message: null,
        isCreated: false,
        isUpdated: false,
      };
    }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// get category reducer

export const categoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        categories: [],
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };

    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// get category details reducer
export const categoryDetailsReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_CATEGORY_SUCCESS:
      return {
        loading: false,
        category: action.payload,
      };

    case GET_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

 //delete category reducer  
export const deleteCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_CATEGORY_REQUEST:
        return {
            ...state,
            loading: true,
        };
    
        case DELETE_CATEGORY_SUCCESS:
        return {
            ...state,
            loading: false,
            isDeleted: action.payload.success,
            message: action.payload.message,
        };
    
        case DELETE_CATEGORY_FAIL:
        return {
            ...state,
            error: action.payload,
        };
    
        case DELETE_CATEGORY_RESET:
        return {
            ...state,
            isDeleted: false,
            message: null,
        };
    
        case CLEAR_ERRORS:
        return {
            ...state,
            error: null,
        };
    
        default:
        return state;
    }
}
