const expect = require('expect');
const {
    Users
} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'John',
            room: 'Node'
        }, {
            id: '2',
            name: 'Smith',
            room: 'React'
        }, {
            id: '3',
            name: 'Shon',
            room: 'Node'
        }]
    });

    it('Should add new User', () => {
        let users = new Users();
        let user = {
            id: 123,
            name: 'John',
            room: 'room'
        }
        let resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
        
    });

    it('Should remove User', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('Should not remove User', () => {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('Should find User', () => {
        var userID = '2';
        var user = users.getUser(userID);

        expect(user.id).toBe(userID);
    });


    it('Should Not find User', () => {
        var userID = '99';
        var user = users.getUser(userID);

        expect(user).toNotExist();
    });
    it('Should return for node course', () => {
        var userList = users.getUserList('Node');
        expect(userList).toEqual(['John', 'Shon']);
    });
})