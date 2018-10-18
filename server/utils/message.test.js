const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('Should pass correct Message', () => {
       let from ='john';
       let text = 'How are you?';
       let message= generateMessage(from,text);

       expect(message.createAt).toBeA('number');
        expect(message).toInclude({from,text});
    });
});