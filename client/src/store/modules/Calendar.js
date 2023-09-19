// import axios from 'axios'
import moment from 'moment'
moment.locale('ru')

export default {
    state() {
        return {
            hours: [],
            days: [],
        }
        
    }, 
    getters: {
        CURRENT_HOURS: state => {
            return state.hours
        }
    }, 
    mutations: {
        UPDATE_HOURS: (state, response) => {
            state.hours = response
        }, 
    }, 
    actions: {
        // загружаем часы с текущего на день вперед
        GET_HOURS ({ commit }) {
            const hours = [];
            const currentHour = Number(moment().format('HH'));
            for (let i = 0; i < 24; i++) {
            let hour = currentHour + i;
            if (hour > 23) {
                hour -= 24; 
            }
            hours.push(`${hour}:00`);
            }
            commit('UPDATE_HOURS', hours);
        },
        
        // показывает текущую неделю на календаре (выбранную)
        // SHOW_WEEK ({commit}, currentDate) {
        //     let days = []
        //     const weekStart = currentDate.clone().startOf("week");
        //     days = this.fillDays(weekStart);

        //     this.firstDay = `${this.capitalizeFirstLetter(this.days[0][2])}  ${this.days[0][3]}`

        // },

    }
}