// import axios from 'axios'

export default {
    state() {
        return {
            registration: '23-07-2023',
            tasks: [{name: 'Утренняя рутина', id: 1, time: '07:00 - 09:00', type: 'EveryDay'}, {name: 'Вечерняя закалка', id: 2, time: '09:00 - 12:30', type: 'Working'},{name: 'Вечерняя закалка', id: 2, time: '09:00 - 17:30', type: 'Common'}],
        }
        
    }, 
    getters: {
        USER_TASKS: state => {
            return state.tasks
        }
    }, 
    mutations: {
        // SET_USERS_FROM_FIREBASE: (state, response) => {
        //     state.users = response
        // }, 
    }, 
    actions: {
        // GET_USERS_FROM_FIREBASE({commit}){
        //     axios.get('https://movie-seeker-d9219-default-rtdb.firebaseio.com/user.json')
        //         .then((res) => {
        //             let data = res.data
        //             const response = Object.keys(data).map(key => {
        //                 return {
        //                     id:key, 
        //                     name: data[key].userName, 
        //                     mail: data[key].userMail, 
        //                     password: data[key].userPassword
        //                 }
        //             })
        //             commit('SET_USERS_FROM_FIREBASE', response)
        //         })
        //         .catch(() => {
        //             alert('Ошибка получения данных пользователей с БД!')
        //         })  
        // }, 

}}