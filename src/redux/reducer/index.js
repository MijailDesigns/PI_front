import { GET_COUNTRIES, ORDER_BY, GET_COUNTRY_DETAIL, GET_COUNTRY_FOR_ACTIVITY, GET_ACTIVITIES, ADD_ACTIVITY, DELETE_ACTIVITY_BY_ID, UPDATE_ACTIVITY } from "../actions";

const inicialState = {
    countries: [],
    countriesDefault:[],
    loading: false,
    activities: [],
    continent: [],
    detail: {},
};

const rootReducer = (state = inicialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                loading: false,
                countries: action.payload,
                countriesDefault: action.payload
            }
        case "LOADING": 
            return {
                ...state,
                loading: true
            }
        case ORDER_BY:
            let {payload} = action
            let paises = [...state.countries]
            const order = (payload, countries) => {
                if(payload === "default"){
                    return state.countriesDefault;
                }
                if (payload === 'ascAlp') {
                    return countries.sort(function(a, b) {
                        if(a.name > b.name) {
                            return 1;
                        }
                        if(b.name > a.name) {
                            return -1;
                        }
                        return 0;
                    })
                }else if (payload === 'descAlp') {
                    return state.countries.sort(function(a, b) {
                        if(a.name > b.name) {
                            return -1;
                        }
                        if(b.name > a.name) {
                            return 1;
                        }
                        return 0;
                    });
                }else if (payload === 'ascPop'){
                    return countries.sort(function(a, b) {
                        if(a.population > b.population) {
                            return 1;
                        }
                        if(b.population > a.population) {
                            return -1;
                        }
                        return 0;
                    })
                }else if (payload === 'descPop'){
                    return countries.sort(function(a, b) {
                        if(a.population > b.population) {
                            return -1;
                        }
                        if(b.population > a.population) {
                            return 1;
                        }
                        return 0;
                    })
                }

            }
            return {
                ...state,
                countries: order(payload, paises)
            }
        case GET_COUNTRY_DETAIL:
            return{
                ...state, 
                detail: action.payload
            }
        case GET_COUNTRY_FOR_ACTIVITY:
            return {
                ...state,
                loading: false,
                countriesInActivity: action.payload
            }
        case ADD_ACTIVITY:
            return {
                ...state,
            }
        case UPDATE_ACTIVITY:
            return {
                ...state,
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        case DELETE_ACTIVITY_BY_ID:
            return {
                ...state,
                activities: state.activities.filter(c => c !== action.payload)
            }
    
        default:
            return state;
    }
    
};

export default rootReducer;