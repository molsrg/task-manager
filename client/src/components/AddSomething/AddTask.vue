<template>
    <div class="form-task">
        <h3 class="form-title">
            Создание задачи
        </h3>
        <form action="" type="post" @submit="addTask" style="display: flex; flex-direction: column; gap: 20px;"> 
            <div>
                <input 
                    class="form-input" 
                    type="text" 
                    placeholder="Название задачи" 
                    v-model="taskName"
                    :class="{'invalid-input': v$.taskName.$error}"
                > 
                <span class="invalid-span" v-if="v$.taskName.$invalid">Минимальная длина 6 символов</span>
            </div>
            
            <div>
                <input class="form-input" type="text" placeholder="Описание задачи" v-model="taskInfo">
                <span class="invalid-span" v-if="v$.taskInfo.$invalid">Минимальная длина 8 символов</span>
            </div>
            

            <div>
                <h4 class="form-text">Тип задачи <span class="invalid-span" v-if="v$.taskType.$invalid">Обязателен к заполнению</span></h4>
                <div class="form-button-container">
                    <input type="radio" id="type-task-1" name="radio-group" v-model="taskType" value="Personal">
                    <label for="type-task-1" class="form-button">Личное</label>
                    
                    <input type="radio" id="type-task-2" name="radio-group" v-model="taskType" value="Working">
                    <label for="type-task-2" class="form-button" >Рабочее</label>

                    <input type="radio" id="type-task-3" name="radio-group" v-model="taskType" value="Optional">
                    <label for="type-task-3" class="form-button" >Спорт</label>

                    <input type="radio" id="type-task-4"  name="radio-group" v-model="taskType" value="Optional">
                    <label for="type-task-4" class="form-button" >Хобби</label>
                </div>
                
            </div>
            <div>
                <input  ref="taskDate" class="form-input" type="text" placeholder="Дата выполнения" v-model="taskStartDate">
                <span class="invalid-span" v-if="v$.taskStartDate.$invalid">Введите дату</span>
            </div>
            <div class="form-input_time">
                <input id="start-time" ref="taskStartTime" class="form-input" type="text" placeholder="Время начала" v-model="taskStartTime">
                <input id="end-time" ref="taskEndTime" class="form-input" type="text" placeholder="Время окончания" v-model="taskEndTime">
            </div>
            <button class="form-submit" type="submit" :class="{ 'form-submit_filled': isFormValid }">Создать</button>
            <button class="form-submit_exit" @click="UPDATE_IS_ADDED_TASK()">Отмена</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

import { mapActions, mapMutations, mapGetters } from "vuex";

import 'air-datepicker/air-datepicker.css';
import AirDatepicker from 'air-datepicker';

// валидация даты в инпуте
const isValidDate = (input) => {
    const regex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (!regex.test(input)) return false;

    const parts = input.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    if (month < 1 || month > 12) return false;
    if (day < 1 || day > new Date(year, month, 0).getDate()) return false;

    return true;
};

export default {
    setup () {
        return {
            v$: useVuelidate()
        }
    },
    mounted() {
        this.formattedDate = this.USER_REGISTRATIONS.split('-').reverse().join('-') + 'T00:00'

        new AirDatepicker(this.$refs.taskDate,{
            // visible: true,
            position: 'right center', // позиционирование календаря
            navTitles: { // стили для отображения шапки календаря
                days: '<strong>yyyy</strong> <i>MMMM</i>',
                months: 'Select month of <strong>yyyy</strong>'    
            }, 
            buttons: ['clear'], // кнопки внизу календаря
            minDate: this.formattedDate, // минимально возможный выбор даты 
            dateFormat: 'yyyy-MM-dd'
        });

        new AirDatepicker('#start-time', {
            onlyTimepicker: true, 
            position: 'left center', // позиционирование календаря
            timepicker: true, // показ выбора времени
        });

        new AirDatepicker('#end-time', {
            onlyTimepicker: true, 
            position: 'right center', // позиционирование календаря
            timepicker: true, // показ выбора времени
        });
        
    },
    
    data(){
        return {
            taskName: '',
            taskInfo: '', 
            taskType: '',
            taskStartDate: '',
            taskStartTime: '',
            taskEndTime: '',

            formattedDate: '',

        }
    }, 
    validations: {
        taskName: { required, minLength: minLength(6) },
        taskInfo: { required, minLength: minLength(8) },
        taskType: { required },
        taskStartDate: { required, isValidDate },
        taskStartTime: { required },
        taskEndTime: { required },
    },
    methods: {
        ...mapActions(['ADD_TASK', 'GET_THIS_DAY_TASKS', 'GET_THIS_WEEK_TASKS', 'GET_TASKLIST']), 
        ...mapMutations(['UPDATE_IS_ADDED_TASK']),

        async addTask(event) {
            event.preventDefault();
            const taskDateInput = this.$refs.taskDate;
            const taskTimeSInput =  this.$refs.taskStartTime;
            const taskTimeEInput =  this.$refs.taskEndTime;

            this.taskStartDate = taskDateInput.value
            this.taskStartTime = taskTimeSInput.value
            this.taskEndTime = taskTimeEInput.value

            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return

            axios({
                method: "POST",
                url: "http://localhost:5000/task/createTask",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
                },
                data: {
                    name: this.taskName,
                    type: this.taskType,
                    text: this.taskInfo,
                    status: "Done",
                    startTime: `${this.taskStartDate}T${this.taskStartTime}:00Z`, 
                    endTime: `${this.taskStartDate}T${this.taskEndTime}:00Z`,
                },
                })
                .then(() => {
                    this.UPDATE_IS_ADDED_TASK()
                    this.GET_THIS_DAY_TASKS(this.PRESENT_DAY)
                    this.GET_THIS_WEEK_TASKS(this.CURRENT_WEEK)
                    this.GET_TASKLIST()
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        validateTask() {
            // const startTime = new Date(this.taskStartTime)
            // const endTime = new Date(this.taskEndTime)
            // this.errors.push('Время окончания не может быть раньше времени начала')

            // if (endTime > startTime) {
            //     this.errors.push('Время окончания не может быть раньше времени начала')
            //     this.taskStartTime = ''
            //     this.taskEndTime = ''
            //     return false
            // }

            return true
        },
    }, 
    computed: {
    ...mapGetters(['USER_REGISTRATIONS', 'PRESENT_DAY', 'CURRENT_WEEK']),
    isFormValid() {
      // Проверка длины всех полей
        const isTaskNameValid = this.taskName.length > 6;
        const isTaskInfoValid = this.taskInfo.length > 8;
        const isTaskTypeValid = this.taskType.length > 0;
        let isTaskStartDateValid = true
        if(this.taskStartDate.length > 0){
            isTaskStartDateValid = isValidDate(this.taskStartDate);
        }

      // Если все поля имеют длину больше 0, форма считается валидной
        return isTaskNameValid && isTaskInfoValid && isTaskTypeValid && isTaskStartDateValid;
    },
    },
    
};
</script>

<style>

.air-datepicker-nav--title{
    /* font-family: Raleway; */
    font-size: 14px;
}

.air-datepicker-body--day-name {
    color: red;
}

.air-datepicker-button span {
    color: red;
}

.air-datepicker-cell.-day-.-weekend- {
    color: red;
}

.air-datepicker-cell.-day-.-current-.-weekend- {
    color: blue;
}
</style>