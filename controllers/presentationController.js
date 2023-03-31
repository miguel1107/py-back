const conexion = require('../database/db')
const Presentation = require('../models/Presentation');

const index = async (req,res,next)=>{
    /*conexion.query("SELECT * FROM presentations WHERE state=1 ", async(error,results)=>{
        res.render('presentaciones',{data:results})
    });*/
    const results = await Presentation.findAll({ where: { state: 1 } })
    res.render('presentaciones',{data:results})
};

const action = async (req,res,next)=>{
    const { id, name, action } = req.body
    /*const id = req.body.id;
    const name = req.body.name;*/
    if (action == 'store') {
        conexion.query('INSERT INTO presentations SET ?',{name:name,state:1},(error,results)=>{
            if(error){console.error(error);}
            res.redirect('/presentaciones');
        });
    } else {
        const upd = "UPDATE presentations SET name='"+name+"' WHERE id='"+id+"'";
        conexion.query(upd,(error,results)=>{
            if(error){console.error(error);}
            res.redirect('/presentaciones');
        });
    }
};

const show = async (req,res,next)=>{
    try {
        const id = req.params.id;
        conexion.query('SELECT * FROM presentations WHERE id='+id,(error,results)=>{
            if(error){console.error(error);}
            res.json({data:results[0]})
        });
    } catch (error) {
        console.log(error);
    }
};

const Delete = async (req, res,next)=>{
    try {
        const id = req.body.id;
        conexion.query('UPDATE presentations SET state=0 WHERE id='+id,(error,results)=>{
            if(error){console.error(error);}
            res.json({state:1})
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    index,
    action,
    show,
    Delete
}