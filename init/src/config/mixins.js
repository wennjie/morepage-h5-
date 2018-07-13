import {router} from './index';

const mixins = {
    data(){
        return {
            message:"文杰"
        }
    },
    created: function () {
      
    },
    methods: {
      push(path){
        router(path)
      }
    }
  }


export default mixins
  