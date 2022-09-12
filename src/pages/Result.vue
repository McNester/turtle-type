<template lang="">
    <div class="flex justify-center items-center w-full flex-col 
    xl:h-[45rem]
    lg:h-[35rem]
    h-[40rem]">
        <div class=" grid  grid-cols-2 
        w-[100vw] h-[10rem]
        sm:w-[50rem] sm:h-[20rem]
        lg:h-[30rem] 
        xl:h-[25rem]">
            <h1> {{wpm}} <br> WPM</h1>
            <h1> {{acc}} <br> ACC</h1>
            
        
        </div>
        <h1> {{time}}</h1>

        <button 
        @click="this.$router.push({replace:true,path:'/'})"
        class="rounded-xl bg-transparent 
        flex justify-center items-center
        hover:bg-[#b8b8b8] active:bg-white
        transition-all ease-linear
        xl:scale-150 
        mt-[5rem] h-[3rem] w-[7rem]
        lg:mb-[5rem]">
            <svg 
            width="47" height="24" viewBox="0 0 47 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M46.1001 13.0607C46.6859 12.4749 46.6859 11.5251 46.1001 10.9393L36.5542 1.3934C35.9684 0.807612 35.0187 0.807612 34.4329 1.3934C33.8471 1.97918 33.8471 2.92893 34.4329 3.51472L42.9182 12L34.4329 20.4853C33.8471 21.0711 33.8471 22.0208 34.4329 22.6066C35.0187 23.1924 35.9684 23.1924 36.5542 22.6066L46.1001 13.0607ZM3 13.5H45.0395V10.5H3V13.5Z" fill="#565656"/>
            <circle cx="4" cy="12" r="4" fill="#565656"/>
            </svg>
        </button>

    </div>
</template>
<script>
export default {
   
   data() {
    return {
        wpm: this.$store.state.wpm,
        acc:this.$store.state.acc,
        time:this.$store.getters.getTime,
    }
   },
   methods: {
    turnOnInputListener(){
        document.addEventListener("keydown", this.goToTypingByKey);

    },
    goToTypingByKey(event){
        if(event.key === 'Tab'){
            removeEventListener('keydown',this.turnOnInputListener)
            this.$router.push({replace:true,path:'/'})
        }

    }

   },
   mounted() {
    this.turnOnInputListener()
   },
    
}
</script>
<style scoped>
h1{
    @apply text-white w-fit self-center justify-self-center text-right 
    text-5xl
    xl:text-9xl
    sm:text-7xl
}
</style>