const { Router} = require('express');
const router = Router();

const Kudo = require('../models/kudo');

//Listado Simple de Kudos
router.get('/list', async (req, res) => {
   const kudos = await Kudo.find();
   res.json(kudos);

});

//Crear Kudos
router.post('/create', async (req, res) => {
    const kudo = new Kudo(req.body);
    kudo.fecha = new Date();
    await kudo.save();
    res.send(kudo);
});

//Eliminar Kudos
router.delete('/:kudoId', async (req, res) => {
    const removedKudo = await Kudo.remove({_id: req.params.kudoId});
    res.send(removedKudo);
});


module.exports = router;