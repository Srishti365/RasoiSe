const jwt = require('jsonwebtoken');
const models = require('../models/models');
Chef = models.chef;


module.exports = {
    signUp: async (req,res) => {
        var { email, password } = req.body;

        const chef = await Chef.findOne({ email });
        if(chef){
            return res.status(422).send({ error: 'Email already exists'});
        }
    
        try{

            password = await models.hashPassword(password);
    
            const chef = new Chef ({ email, password });
            console.log('chef', chef);

            await chef.save();

    
            const token = jwt.sign({ userId: chef._id }, 'MY_SECRET_KEY');
    
            res.send({ token });
        } catch (err) {
            console.log(err);
            return res.status(422).send({ error: 'Something went wrong!!'});
        }
    },
    signIn: async(req,res) => {
        const { email, password } = req.body;
        console.log(email,password)

        if(!email || !password) {
            return res.status(422).send({ error: 'Must provide email and password'});
        }
    
        const chef = await Chef.findOne({ email });
        if(!chef){
            return res.status(422).send({error:'You have not registered yet!!'});
        }

        // console.log(user.password);
        // if(user.active == false){
        //     return res.status(422).send({verify: 'Verify your email first'});
        // }
    
        try{
            await chef.comparePassword(password);
            const token = jwt.sign({ userId : chef._id }, 'MY_SECRET_KEY' );

            console.log(token)
    
            res.send({ token });
        } catch (err){
            return res.status(422).send({ error:'Invalid password or email'});
        }
    }
}