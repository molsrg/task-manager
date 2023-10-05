export default {
    state() {
        return {
            isAddedTask: false, 
            isAddedTaskList: false
        }
        
    }, 
    getters: {
        IS_ADDED_TASK: state => {
            return state.isAddedTask
        }, 
        IS_ADDED_TASKLIST: state => {
            return state.isAddedTaskList
        }, 
    }, 
    mutations: {
        UPDATE_IS_ADDED_TASK: (state) => {
            state.isAddedTask = !state.isAddedTask
        }, 
        UPDATE_IS_ADDED_TASKLIST: (state) => {
            state.isAddedTaskList = !state.isAddedTaskList
        }, 
        
    }, 
    actions: {
        
    }
}