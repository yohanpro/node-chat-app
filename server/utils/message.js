const moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        // createAt: new Date().getTime()
        createAt: moment().valueOf()
    }
};

var generateLocationMessage=(from,longitude,latitude)=>{
    return{
        from,
        url:`https://google.com/maps?q=${longitude},${latitude}`,
        createAt:moment.valueOf()
    }
}
module.exports = {
    generateMessage,generateLocationMessage
}