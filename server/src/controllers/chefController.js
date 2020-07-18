const jwt = require('jsonwebtoken');
const models = require('../models/models');
Chef = models.chef;


module.exports = {
    signUp: async (req,res) => {
        var { email, password, location, name } = req.body;

        const chef = await Chef.findOne({ email });
        if(chef){
            return res.status(422).send({ error: 'Email already exists'});
        }
    
        try{

            password = await models.hashPassword(password);
    
            const chef = new Chef ({ email, password, location, name, active:false });
            console.log('chef', chef);

            await chef.save();

    
            const token = jwt.sign({ userId: chef._id }, 'MY_SECRET_KEY');
            console.log(token,'token')
    
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

        if(chef.active == false){
            return res.status(422).send({error: 'We need to verify first!!!'});
        }
    
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