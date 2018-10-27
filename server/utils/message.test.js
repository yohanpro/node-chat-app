const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('Should pass correct Message', () => {
        let from = 'john';
        let text = 'How are you?';
        let message = generateMessage(from, text);

        expect(message.createAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });
    });
});
describe('generateLocationMessage', () => {
    it('Should return correct location', () => {
        let from = 'Admin';
        let latitude = 1;
        let longitude = 1;
        let url = 'https://google.com/maps?q=1,1'
        let message = generateLocationMessage(from, latitude, longitude);


        expect(message.createAt).toBeA('number');
        expect(message).toInclude({from,url});
    })
});