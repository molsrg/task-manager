export default {
    state() {
        return {

            showLoader: false,

            isAddedTask: false, 
            isAddedTaskList: false,
            isShowTask: false, 
            isCheckSelectedTask: false,

            checkedTask: undefined
        }
        
    }, 
    getters: {

        IS_ADDED_TASK: state => {
            return state.isAddedTask
        }, 
        IS_ADDED_TASKLIST: state => {
            return state.isAddedTaskList
        }, 
        IS_SHOW_TASK: state => {
            return state.isShowTask
        }, 
        IS_CHECK_SELECTED_TASK: state => {
            return state.isCheckSelectedTask
        },

        CHECKED_TASK: state => {
            return state.checkedTask
        },
        
        SHOW_LOADER: state => {
            return state.showLoader
        }
    }, 
    mutations: {
        UPDATE_IS_ADDED_TASK: (state) => {
            state.isAddedTask = !state.isAddedTask
        }, 
        UPDATE_IS_ADDED_TASKLIST: (state) => {
            state.isAddedTaskList = !state.isAddedTaskList
        }, 
        UPDATE_IS_SHOW_TASK: (state) => {
            state.isShowTask = !state.isShowTask
        }, 
        UPDATE_CHECKED_TASK: (state, task) => {
            state.checkedTask = task
        }, 
        UPDATE_CHECK_SELECT_TASK: (state) => {
            state.isCheckSelectedTask = !state.isCheckSelectedTask
        }, 
        UPDATE_SHOW_LOADER: (state) => {
            state.showLoader = !state.showLoader
        }
        
        
    }, 
    actions: {
        
    }
}