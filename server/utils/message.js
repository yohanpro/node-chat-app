var generateMessage = (from, text) => {
    return {
        from,
        text,
        createAt: new Date().getTime()
    }
};

var generateLocationMessage=(from,longitude,latitude)=>{
    return{
        from,
        url:`https://google.com/maps?q=${longitude},${latitude}`,
        createAt:new Date().getTime()
    }
}
module.exports = {
    generateMessage,generateLocationMessage
}