import {createStore} from 'vuex'
import arrayShuffle from 'array-shuffle';

const store = createStore({
    state: {
        wpm: 38,
        acc: 100,
        time: {minutes:0, seconds:40},
        texts:[
            {id:0,text:"Be yourself; everyone else is already taken."},
            {id:1,text:"Success is not final; failure is not fatal: It is the courage"},
            {id:2,text:"I never dreamed about success. I worked for it."},
            {id:3,text:"Either you run the day or the day runs you."},
            {id:4,text:"Women challenge the status quo because we are never it."},
            {id:5,text:"A witty woman is a treasure; a witty beauty is a power."},
            {id:6,text:"He who conquers himself is the mightiest warrior."},
            {id:7,text:"One man with courage makes a majority."},
            {id:8,text:"Opportunities don't happen, you create them."},
            {id:9,text:"Love your family, work super hard, live your passion."},
            {id:10,text:"It is never too late to be what you might have been."},
            {id:11,text:"Don't let someone else's opinion of you become your reality"},
            {id:12,text:"If you’re not positive energy, you’re negative energy."},
            {id:13,text:"Friday sees more smiles than any other day of the workweek!"},
            {id:14,text:"He that can have patience can have what he will."},
            {id:15,text:"Set your goals high, and don’t stop till you get there."},
        ],
        currentTextId:0
    },
    getters: {
        getTime (state) {
            let seconds = state.time.seconds
            if(state.time.seconds < 10){
                seconds ='0'+state.time.seconds
            }

          return state.time.minutes +":"+seconds
        },
        getShuffledTexts(state){
            var shuffledArray = arrayShuffle(state.texts);
            
            return shuffledArray
        }
    },
    mutations:{
        setWPM(state, newWPM){
            state.wpm = newWPM
        },
        setACC(state, newACC){
            state.acc = newACC
        },
        setTime(state, newTime){
            state.time = newTime
        },
        addTextsToTexts(state,texts){
            state.texts.push(texts)
        },
        setCurrentTextId(state,newId){
            state.currentTextId = newId
        }
    }
})

export default store;