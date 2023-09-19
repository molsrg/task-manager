import Vuex from 'vuex'
import User from './modules/User'
import Calendar from './modules/Calendar'
const store = new Vuex.Store ({

    modules: {
        User, 
        Calendar
    }
})


export default store 
