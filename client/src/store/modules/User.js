// import axios from 'axios'
export default {

    state() {
        return {
            registration: '23-07-2023',
            tasklist: [
                {
                    title: 'Эта неделя',
                    toggleCircle: false,
                    isTasklistVisible: false,
                    tasks: [
                        {name: 'Кросс бегит 10км', id: 1, time: '03:00 - 05:00', type: 'EveryDay', date: '25-09-2023'},
                        {name: 'Дрочит', id: 2, time: '12:00 - 17:00', type: 'Working',date: '26-09-2023'},
                        {name: 'Обед кушать плотный спасибо мама', id: 3, time: '15:00 - 20:00', type: 'Common',date: '27-09-2023'},
                        {name: 'Дрочит', id: 4, time: '12:00 - 14:30', type: 'Common',date: '27-09-2023'},
                        {name: 'Уроки делат', id: 5, time: '12:00 - 17:30', type: 'EveryDay', date: '29-09-2023'},
                        {name: 'Пакакать', id: 6, time: '17:30 - 20:00', type: 'Working',date: '29-09-2023'},
                        {name: 'Прес делат буду бальшой', id: 7, time: '20:00 - 22:00', type: 'Common',date: '30-09-2023'},
                        {name: 'Дрочит на ноч спокойно ночи', id: 8, time: '12:00 - 24:00', type: 'Common',date: '01-10-2023'}
                        
                    ],
                }, 
                {
                    title: 'Этот месяц',
                    toggleCircle: false,
                    isTasklistVisible: false,
                    tasks: [
                        {name: 'Утренняя рутина', id: 4, time: '10:00 - 15:00', type: 'EveryDay'},
                        {name: 'Вечерняя закалка', id: 5, time: '19:00 - 22:00', type: 'Working'},
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