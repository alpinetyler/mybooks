import axios from 'axios'

const GET_RENTALS = 'GET_RENTALS'
const GET_RENTALS_FULFILLED = 'GGET_RENTALS_FULFILLED'
const GET_RENTALS_PENDING = 'GET_RENTALS_PENDING'

const GET_RENTAL = 'GET_RENTAL'
const GET_RENTAL_FULFILLED = 'GET_RENTAL_FULFILLED'
const GET_RENTAL_PENDING = 'GET_RENTAL_PENDING'

let initialState = {
    data: [],
    loading: false,
    selected: null,
    rentals: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_RENTALS_PENDING:
            return { ...state, loading: true}
        case GET_RENTALS_FULFILLED:
            return { ...state, loading: false, data: action.payload.data }

        case GET_RENTAL_PENDING:
            return { ...state, loading: true }
        case GET_RENTAL_FULFILLED:
            return { ...state, loading: false, selected: action.payload.data }
        default:
            return state;
    }
}

export function getRentals() {
    return {
        type: GET_RENTALS,
        payload: axios.get('/api/rentals')
    
    }
}

export function getRental(id) {
    return {
        type: GET_RENTAL,
        payload: axios.get(`/api/rental/${id}`)
    }
}