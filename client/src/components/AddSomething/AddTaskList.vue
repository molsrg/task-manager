<template>
        <div class="form-task">
            <h3 class="form-title">
                Создание списка задач
            </h3>
            <form action="" type="post" @submit="addTaskList" style="display: flex; flex-direction: column; gap: 20px;"> 
                <div>
                    <input 
                        class="form-input" 
                        type="text" 
                        placeholder="Название списка" 
                        v-model="taskListTitle"
                    > 
                    <span class="invalid-span" v-if="v$.taskListTitle.$invalid">Минимальная длина 6 символов</span>
                </div>
                
                <div>
                    <input class="form-input" type="text" placeholder="Описание списка" v-model="taskListInfo">
                    <span class="invalid-span" v-if="v$.taskListInfo.$invalid">Минимальная длина 8 символов</span>
                </div>
                

                <div>
                    <input  id="taskListDate" ref="taskListDate" class="form-input" type="text" placeholder="Дата выполнения" v-model="taskListDate">
                    
                </div>

                <button class="form-submit" type="submit">Создать</button>
                <button class="form-submit_exit" @click="UPDATE_IS_ADDED_TASKLIST()">Отмена</button>
            </form>
    </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapMutations, mapGetters } from "vuex";

import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

import 'air-datepicker/air-datepicker.css';
import AirDatepicker from 'air-datepicker';


export default {
    setup () {
        return {
            v$: useVuelidate()
        }
    },
    mounted() {
        this.formattedDate = this.USER_REGISTRATIONS.split('-').reverse().join('-') + 'T00:00'

        new AirDatepicker('#taskListDate',{
            position: 'right center',
            range: true,
            multipleDatesSeparator: ' - ', 
            dateFormat: 'yyyy-MM-dd',
            buttons: [
        {
            content(dp) {
                return dp.opts.timepicker 
                    ? 'Выключить выбор времени'
                    : 'Включить выбор времени'
            },
            onClick(dp) {
                let viewDate = dp.viewDate;
                let today = new Date();
                
                // Since timepicker takes initial time from 'viewDate', set up time here, 
                // otherwise time will be equal to 00:00 if user navigated through datepicker
                viewDate.setHours(today.getHours());
                viewDate.setMinutes(today.getMinutes());

                dp.update({
                    timepicker: !dp.opts.timepicker,
                    viewDate
                })
            }
        }
    ]
        });
        
    },
    data(){
        return {
            taskListTitle: '',
            taskListInfo: '',
            taskListDate:'',


            taskListStartTime: '',
            taskListEndTime: '',

            formattedDate: ''
        }
    }, 
    validations: {
        taskListTitle: { required, minLength: minLength(6) },
        taskListInfo: { required, minLength: minLength(8) },
        taskListDate: { required },

    },
    methods: {
        ...mapActions(['ADD_TASK', 'GET_TASKLIST']), 
        ...mapMutations(['UPDATE_IS_ADDED_TASKLIST']),
        splitDateRange(dateRange) {
            const [startDate, endDate] = dateRange.split(' - ');
            return { startDate, endDate };
        },

        formatToISODate(dateString) {
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}T00:00:00Z`;
            } else {
                return null;
            }
        },
        
        async addTaskList(event) {
            event.preventDefault();

            const taskDateInput = this.$refs.taskListDate
            this.taskListDate = taskDateInput.value

            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return

            const { startDate, endDate } = this.splitDateRange(this.taskListDate);

            axios({
                method: 'POST',
                url: 'http://localhost:5000/task/createTaskList',
                headers: {'authorization': `Bearer ${localStorage.getItem('AccessToken')}`},
                data: {
                    title: this.taskListTitle,
                    toggleCircle: false,
                    isTasklistVisible: false,
                    startTime: this.formatToISODate(startDate),
                    endTime: this.formatToISODate(endDate),
                },
            })
            .then(() => {
                this.UPDATE_IS_ADDED_TASKLIST()
                this.GET_TASKLIST()
            })
            .catch((err) => {
                console.log(err)
            }) 
        }
    },
    computed: {
    ...mapGetters(['USER_REGISTRATIONS']),
    },
};
</script>