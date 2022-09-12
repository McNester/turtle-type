

import Result from '/src/pages/Result.vue'
import Typing from '/src/pages/Typing.vue'
import {createRouter, createWebHistory} from 'vue-router'


const routes=[
    {
        path: '/result',
        component: Result,
        name:'result',
    },
    {
        path: '/',
        component: Typing,
        
    },

]


   
    
    

const router = createRouter(
    {
        routes,
        history: createWebHistory()
    }
)


export default router;