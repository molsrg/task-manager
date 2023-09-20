// import axios from 'axios'

export default {
    state() {
        return {
            registration: '23-07-2023',
            tasks: [{name: 'Утренняя рутина', id: 1, time: '07:00 - 09:00', type: 'EveryDay'}, {name: 'Вечерняя закалка', id: 2, time: '09:00 - 12:30', type: 'Working'},{name: 'Вечерняя закалка', id: 2, time: '09:00 - 17:30', type: 'Common'}],
            tasklist: [
                {
                    title: 'Эта неделя',
                    toggleCircle: false,
                    isTasklistVisible: false,
                    tasks: [
                        {name: 'Утренняя рутина', id: 1, time: '07:00 - 09:00', type: 'EveryDay'},
                        {name: 'Вечерняя закалка', id: 2, time: '09:00 - 12:30', type: 'Working'},
                        {name: 'Вечерняя закалка', id: 3, time: '09:00 - 17:30', type: 'Common'},
                        
                    ],
                }, 
                {
                    title: 'Этот месяц',
                    toggleCircle: false,
                    isTasklistVisible: false,
                    tasks: [
                        {name: 'Утренняя рутина', id: 4, time: '10:00 - 19:00', type: 'EveryDay'},
                        {name: 'Вечерняя закалка', id: 5, time: '19:00 - 22:30', type: 'Working'},
                        {name: 'Вечерняя закалка', id: 6, time: '21:00 - 23:30', type: 'Common'},
                    ],
                }, 
            ], 
            selectTask: []
        }
        
    }, 
    getters: {
        
        USER_REGISTRATIONS: state => {
            return state.registration
        },
        USER_TASKLISTS: state => {
            return state.tasklist
        }, 
        USER_SELECT_TASKS: state => {
            return state.selectTask
        }
    }, 
    mutations: {
        UPDATE_VISIBLE_TASKLIST: (state, idx) => {
            state.tasklist[idx].toggleCircle = !state.tasklist[idx].toggleCircle
            state.tasklist[idx].isTasklistVisible = !state.tasklist[idx].isTasklistVisible
        }, 
        UPDATE_SELECT_TASKS: (state, response) => {
            state.selectTask = response
        }
    }, 
    actions: {
        
        

        }

}