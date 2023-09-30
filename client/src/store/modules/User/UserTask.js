import axios from 'axios'
export default {
    state() {
        return {
            tasklist: [
                {
                    title: 'Этот день',
                    toggleCircle: false,
                    isTasklistVisible: false,
                    tasks: [

                    ],
                }, 
                {
                    title: 'Эта неделя',
                    toggleCircle: false,
                    isTasklistVisible: false,
                    tasks: [],
                },
            ]
        }
        
    }, 
    getters: {

    }, 
    mutations: {
        UPDATE_THIS_DAY_TASKS: (state, response) => {
            state.tasklist[0].tasks = response
        }, 
        UPDATE_THIS_WEEK_TASKS: (state, response) => {
            state.tasklist[1].tasks = response
        }, 
    }, 
    actions: {
        GET_THIS_DAY_TASKS({commit}, day) {
            const presentDay = `${day[2]}-${day[3]}-${day[0]}`
            const nextDay = `${day[2]}-${day[3]}-${Number(day[0]) + 1}`

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
    }

}