import axios from 'axios'
export default {

    state() {
        return {
            registration: '23-07-2023',
            tasklist: [
                {
                    title: 'Этот день',
                    toggleCircle: false,
                    isTasklistVisible: false,
                    id: 1,
                    tasks: [
                    ],
                }, 
                {
                    title: 'Эта неделя',
                    toggleCircle: false,
                    isTasklistVisible: false,
                    tasks: [],
                    id: 2,
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
        }, 
        USER_TASKS_IN_CALENDAR: state => {
            return state.tasklist[1].tasks
        }
    }, 
    mutations: {
        UPDATE_VISIBLE_TASKLIST: (state, idx) => {
            state.tasklist[idx].toggleCircle = !state.tasklist[idx].toggleCircle
            state.tasklist[idx].isTasklistVisible = !state.tasklist[idx].isTasklistVisible
        }, 
        UPDATE_SELECT_TASKS: (state, response) => {
            state.selectTask = response
        }, 
        UPDATE_THIS_DAY_TASKS: (state, response) => {
            state.tasklist[0].tasks = response
        }, 
        UPDATE_THIS_WEEK_TASKS: (state, response) => {
            state.tasklist[1].tasks = response
        }, 
        UPDATE_TASKLIST: (state, data) => {
            state.tasklist.push(data)
        }, 

        UPDATE_TASK_IN_TASKLIST: (state, payload) => {
            const tasks = payload.tasks
            const id = payload.id

            for (let i = 2; i < state.tasklist.length; i++){
                if(id === state.tasklist[i].id){
                    state.tasklist[i].tasks = tasks
                }
            }
        }
    }, 
    actions: {
        GET_THIS_DAY_TASKS({commit}, day) {
            const presentDay = `${day[2]}-${day[3]}-${day[0]}`

            let nextDay_day =  day[0].split('0')

            const nextDay = `${day[2]}-${day[3]}-${Number(day[0]) > 10 ? Number(day[0]) + 1 : `0${Number(nextDay_day[1]) + 1}`}`
            
            axios({
                method: 'GET', 
                url: 'http://localhost:5000/task/get',
                headers: {'authorization': `Bearer ${localStorage.getItem('AccessToken')}`},
                params: {
                    startTime: `${presentDay}T00:00:00Z`, 
                    endTime: `${nextDay}T00:00:00Z`, 
                }
            })
            .then((response) => {
                commit('UPDATE_THIS_DAY_TASKS', response.data.tasks)
            })
            .catch(() => {

                alert("Запрос на этот день не удался")
            })   
        },
        GET_THIS_WEEK_TASKS({commit}, week) {
            const startTime = `${week[0][3]}-${week[0][4]}-${week[0][1]}`
            const endTime = `${week[6][3]}-${week[6][4]}-${week[6][1]}`

            axios({
                method: 'GET', 
                url: 'http://localhost:5000/task/get',
                headers: {'authorization': `Bearer ${localStorage.getItem('AccessToken')}`},
                params: {
                    startTime: `${startTime}T00:00:00Z`, 
                    endTime: `${endTime}T00:00:00Z`, 
                }
            })
            .then((response) => {
                commit('UPDATE_THIS_WEEK_TASKS', response.data.tasks)
            })
            .catch(() => {
                alert("Запрос на эту неделю не удался")
            })   
        },

        ADDED_TASKLIST({commit}){
            const data = {
                title: 'Кастомное название',
                toggleCircle: false,
                isTasklistVisible: false,
                tasks: [],
                startTime: "2023-10-02T11:00:00Z",
                endTime: "2023-10-07T16:30:00Z",
                id: 3,
            }
            commit('UPDATE_TASKLIST', data )
            
        }, 

        GET_TASK_IN_TASKLIST({commit}, data){


            const startTime = data.startTime
            const endTime = data.endTime

            const id = data.id

            axios({
                method: 'GET', 
                url: 'http://localhost:5000/task/get',
                headers: {'authorization': `Bearer ${localStorage.getItem('AccessToken')}`},
                params: {
                    startTime: startTime, 
                    endTime: endTime, 
                }
            })
            .then((response) => {
                commit('UPDATE_TASK_IN_TASKLIST', {tasks: response.data.tasks, id: id})
            })
            .catch(() => {
                alert("Запрос на кастомный список не удался")
            })   

            
        }

    }

}