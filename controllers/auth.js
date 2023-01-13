const bcryptjs = require('bcryptjs');

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      const { username, password } = req.body


      for (let i = 0; i < users.length; i++) {
         if (users[i].username === username){
          const authenticated = bcryptjs.compareSync(password, users[i].pinHash)
          if (authenticated) {
            let userReturn = {...users[i]}
            delete userReturn.pinHash;
            res.status(200).send(userReturn);
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')

        const { username, email, firstName, lastName, password } = req.body;

        const salt = bcryptjs.genSaltSync(5);
        const pinHash = bcryptjs.hashSync(password, salt);

        let passObj = {
          username,
          email,
          firstName, 
          lastName,
          pinHash
        }

        users.push(passObj);
        let securedPassword = {...passObj};
        delete securedPassword.pinHash;
        res.status(200).send(securedPassword);
    }
}