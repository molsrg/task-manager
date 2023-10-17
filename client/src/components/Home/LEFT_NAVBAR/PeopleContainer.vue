<template>
    <div class="people-container">
        <img
            class="people-container_logo"
            src="../../../assets/images/logo/logo.svg"
            alt="logo"
        />

        <div class="people-container_users">
            <h3 class="people-container_users-count">3</h3>
            <img src="../../../assets/images/home/line__horizont.svg" alt="" />
            <img
            src="../../../assets/images/home/zaxar.png"
            alt=""
            class="people-container_users-user"
            />
            <img
            src="../../../assets/images/home/zaxar.png"
            alt=""
            class="people-container_users-user"
            />
            <img
            src="../../../assets/images/home/zaxar.png"
            alt=""
            class="people-container_users-user"
            />
            
            <img
            src="../../../assets/images/home/zaxar.png"
            alt=""
            class="people-container_users-user"
            />
            <button class="people-container_users-add_user" @click="addPeople()">
                <img src="../../../assets/images/home/addpeople.svg" alt="" />
            </button>
        </div>

        <!-- <img @click="goPersonalArea" src="../../../assets/images/home/lk.svg" alt=""> -->
        <!-- <img @click="goOut" src="../../../assets/images/home/exit.svg" alt=""> -->
        </div>
</template>

<script>
export default {
    data() {
        return {
        checkedTasks: [],
        };
    
    },
    methods: {

        goPersonalArea(){
            window.location.href = "http://localhost:8080/personal"
        },
        // заготовка под добавление людей
        addPeople() {

        },

        goOut(){
            localStorage.removeItem('AccessToken')
            window.location.href = "http://localhost:8080/"
        },
    },
};
</script>

<style>
.people-container{
    font-family: Raleway;
    display: flex;
    flex-direction: column;
    gap: 41px;
    min-height: 100vh;
    padding: 0px 13px;
    background-color: rgb(217, 217, 217);
}

.people-container_logo{
    margin-top: 35px;
}

.people-container_users {
    display: flex;
    flex-direction: column;
    gap: 18px;

}

.people-container_users-count{
    text-align: center;
    padding-bottom: 10px;
    border-radius: 15px;
    background-color: #15616D;
    color: #ffecd1;
    font-size: 48px;
    font-weight: 500;
}

.people-container_users-user{
    border-radius: 100%;
}

.people-container_users-add_user{
    background-color: #bfbfbf;
    border-radius: 100%;
    padding: 22px 0;
}
</style>