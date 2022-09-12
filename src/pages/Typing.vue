<template>

    <div >

        <div id="textContainer" 
        class="xl:w-[70rem] xl:h-[75vh] 
        flex flex-col items-center justify-center mx-auto">
  
<!-- TODO: make autoscroll on big texts!! -->        
        <h2 id="text" 
        class=" text-[#767676] z-0  overflow-y-scroll 
        text-3xl w-[20rem] h-[4.1rem] my-[10rem] text-center
        md:text-left md:text-4xl md:w-[40rem] md:h-[5rem] md:my-[10rem]
        lg:text-5xl lg:w-[50rem] lg:h-[6rem] lg:mb-[5rem] lg:mt-[10rem] 
        xl:text-7xl xl:w-[60rem] xl:h-[9.5rem] xl:my-[10rem]">
          <span v-for="char in currentText">
              {{char}}
          </span>
        </h2>
        
        

        <button 
        @click="resetText()"
        class=" h-[3.6rem] w-[7rem] rounded-xl bg-transparent pb-[3.1rem]
        flex justify-center items-center
        hover:bg-[#b8b8b8] active:bg-white
        transition-all ease-linear">
            <svg width="48" height="102" viewBox="0 0 48 102" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.69185 76.77C6.69185 77.5984 7.36342 78.27 8.19185 78.27C9.02028 78.27 9.69185 77.5984 9.69185 76.77L6.69185 76.77ZM8.19186 71.6415L9.69186 71.6415L8.19186 71.6415ZM25.7496 90.7694L25.7496 92.2693L25.7496 92.2693L25.7496 90.7694ZM18.1321 89.7087C17.5463 90.2945 17.5463 91.2442 18.1321 91.83L27.678 101.376C28.2638 101.962 29.2135 101.962 29.7993 101.376C30.3851 100.79 30.3851 99.8404 29.7993 99.2546L21.314 90.7694L29.7993 82.2841C30.3851 81.6983 30.3851 80.7485 29.7993 80.1627C29.2135 79.577 28.2638 79.577 27.678 80.1628L18.1321 89.7087ZM42.2649 62.5466L40.9644 63.2941L42.2649 62.5466ZM44.6926 71.6792L43.1926 71.6792L44.6926 71.6792ZM9.69185 76.77L9.69186 71.6415L6.69186 71.6415L6.69185 76.77L9.69185 76.77ZM25.7496 89.2694L19.1927 89.2694L19.1927 92.2693L25.7496 92.2693L25.7496 89.2694ZM40.9644 63.2941C42.4227 65.8311 43.1925 68.7467 43.1926 71.6792L46.1926 71.6792C46.1925 68.2283 45.2882 64.7964 43.5654 61.7991L40.9644 63.2941ZM25.7496 92.2693C37.0551 92.2693 46.1927 82.9545 46.1926 71.6792L43.1926 71.6792C43.1926 81.3279 35.3681 89.2693 25.7496 89.2694L25.7496 92.2693ZM9.69186 71.6415C9.6919 54.4872 32.4157 48.4217 40.9644 63.2941L43.5654 61.7991C33.4856 44.263 6.6919 51.4149 6.69186 71.6415L9.69186 71.6415Z" fill="#565656"/>
            <circle cx="8" cy="76" r="5" fill="#565656"/>
            </svg>
        </button>

  
      </div>
      
  
    </div>
  
  </template>
  
  <script>
  import arrayShuffle from 'array-shuffle';


  
  export default{
    data() {
      return {
        
        textInput:'',
        currentText:'',
        currentTextId: this.$store.state.currentTextId,
        interval: null,
        minutes:0,
        seconds:0,
        entries:0,
        correctEntries:0,
        
      }
    },
    props:{
        texts:Array
    },
    methods: {
      onInput(){
        var vm = this;

        function onPress(event) {
            //TODO: clear the timer here
            
            /*if(event.key === 'Tab' ){
              vm.resetText()
              return
            }*/
            if(event.key === 'Tab'){
              vm.resetText()
              return
            }

            if(event.key === 'Enter' || event.key === 'Escape'
            || event.key === 'CapsLock' || event.key === 'Unidentified' || event.key ==='Shift' || event.ctrlKey
            || event.altKey || event.metaKey || event.key.includes('Arrow')){
                return;
            }

            
            //TODO make methods for those things, simplify, make code below more clean
            var text = document.getElementById('text');
            var chars = text.children
        
        
        

            if(event.key === 'Backspace'){
                var currentChar = chars[vm.textInput.length-1]
                vm.textInput = vm.removeLastChar(vm.textInput)

                if(currentChar.className === 'extraChar'){
                currentChar.className = '';
                const indexOfCurrentChar = Array.from(chars).indexOf(currentChar);
                vm.currentText = vm.currentText.slice(0,indexOfCurrentChar) + vm.currentText.slice(indexOfCurrentChar+1,vm.currentText.length)
                
                }
                vm.setDefaultColour(currentChar);
                
            }

            else{
                if(vm.interval == null && vm.textInput.length == 0){
                    vm.interval = setInterval(vm.handleTheStopWatch,1000)
                }

                vm.textInput += event.key
                


                if(vm.textInput.length >= Array.from(chars).length){
                    vm.textInput = ''

                    clearInterval(vm.interval)
                    vm.interval = null

                    vm.$store.commit('setWPM', vm.evaluateWPM(vm.entries))
                    vm.$store.commit('setTime', {minutes:vm.minutes,seconds:vm.seconds})
                    vm.$store.commit('setACC', vm.evaluateAccuracy(vm.entries,vm.correctEntries))

                    vm.changeCurrentTextId()
                    
                    
                    
                    
                    vm.$router.push({replace:true,name:'result'})
                    this.removeEventListener('keydown',onPress)
                    
                    
                    
                    //TODO: remove this stuff
                    /*
                    var text = document.getElementById('text');
                    var chars = text.children
                    for(var i = 0; i < Array.from(chars).length; i++){
                        chars[i].className = '';
                        vm.setDefaultColour(chars[i]);
                    }
                    vm.textInput = ''
                    vm.changeCurrentText()*/

                    return
                }
                vm.entries++
                
                const unchangedCurrentText = vm.currentText

                

                if(vm.currentText[vm.textInput.length-1] === " " && event.key !== " "){
                    vm.currentText = vm.currentText.substring(0, vm.textInput.length-1) + event.key + vm.currentText.substring(vm.textInput.length-1);
                    var currentChar = chars[vm.textInput.length-1]
                    currentChar.className = 'extraChar';
                
                }
                vm.setColorByCorrectness(unchangedCurrentText,vm.textInput)
            }
        
        }
        
        document.addEventListener("keydown", onPress);
      },
      changeCurrentTextId(){
        this.currentTextId++;
        
        
  
        if(this.texts.length == this.currentTextId){
          
          this.currentTextId = 0;
        }
        this.$store.commit('setCurrentTextId',this.currentTextId)
      },
      changeCurrentText(){
        this.changeCurrentTextId()
        
        
        this.currentText = this.texts[this.currentTextId].text
      },
      removeLastChar(str){
        return str.slice(0,str.length-1)
      },
      //TODO: seperate isCharCorrect and setColorByCorrectness + put correctEntries++ on its own with its own check 
      setColorByCorrectness(originalText,input){
        var text = document.getElementById('text');
        var chars = text.children
        var currentChar = chars[input.length-1]
        if(input[input.length-1] === originalText[input.length-1]){
          currentChar.style.color = 'white'
          //TODO: NEED TO BE REPLACED
          this.correctEntries++
        }else{
          currentChar.style.color = 'red'
        }
      },
      setDefaultColour(element){
        element.style.color='#767676'
      },
      resetText(){              
        var text = document.getElementById('text');
        var chars = text.children
        for(var i = 0; i < Array.from(chars).length; i++){
            chars[i].className = '';
            this.setDefaultColour(chars[i]);
        }
        this.textInput = ''
        this.changeCurrentText()

        this.minutes = 0
        this.seconds = 0
        this.entries = 0
        this.correctEntries = 0;

        clearInterval(this.interval)
        this.interval = null
      },
      handleTheStopWatch(){
        this.seconds++
        if(this.seconds == 60){
            this.secondes = 0;
            this.minutes++;
        }
      },
      getMinutesForWPM(){
        return this.minutes + this.convertSecondsToMinutes(this.seconds)

      },
      convertSecondsToMinutes(seconds){
        return seconds/60
      },
      evaluateWPM(typedCharacters){
        let timeInMin = this.getMinutesForWPM()
        if(timeInMin == 0){
            return 300
        }
        return Math.round( (typedCharacters / 5) / timeInMin )
      },
      evaluateAccuracy(entries,correctEntries){
        return Math.round((correctEntries/entries) * 100)
      }
    },
    mounted() {
      this.onInput()
      this.currentText = this.texts[this.currentTextId].text
    }
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Megrim&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
  
  #textContainer{
    word-break: break-all;
  }
  #text{
  white-space:pre-wrap;
  word-break:break-word;
  }
  #inputText{
  white-space:pre-wrap;
  word-break:break-word;
  }
  .extraChar{
    opacity: 38%!important
  }
  
  </style>
  