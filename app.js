const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

//const errorController = require('./controllers/error');

const sequelize = require('./util/database');
const User = require('./models/User');
const Form = require('./view/form');

var Cors = require('cors');

const app = express();

//app.set('view engine', 'ejs');
//app.set('views', 'views');
app.use(Cors());

//const adminRoutes = require('./routes/admin');
//const shopRoutes = require('./routes/shop');



app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'Form')));

//app.use('/admin', adminRoutes);
//app.use(shopRoutes);

//app.use(errorController.get404);



app.post('/user/add-user', async(req,res,next) => {
    try{

        if(!req.body.phonenumber){
            throw new Error('Phone number is mendatory')
        }
    const name = req.body.name;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber

    const data = await User.create({name:name,email:email,phonenumber:phonenumber})
    res.status(201).json({newUserDetail: data});
    }
    catch(err){
        res.status(500).json({
            err:err
        })
    }
})



sequelize.sync()
.then((res) => {
   // console.log(res)
    app.listen(5000); 
})
.catch(err => console.log(err))



