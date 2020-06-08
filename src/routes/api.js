const { Router} = require('express');
const router = Router();

const Kudo = require('../models/kudo');
const publisher = require('../queue/publisher');

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

    let data_queu = {
        idUsuario : req.body.destino,
        qty : 1
    };
    publisher.publish(data_queu).catch((error) => {
    console.error(error)
    process.exit(1)
    });

    res.send(kudo);
});

//Eliminar Kudos
router.delete('/:kudoId', async (req, res) => {
    const backupkudo = await Kudo.findById({ _id: req.params.kudoId });
    const removedKudo = await Kudo.remove({_id: req.params.kudoId});
    let data_queu = {
        idUsuario: backupkudo.destino,
        qty: -1
    };
    publisher.publish(data_queu).catch((error) => {
        console.error(error)
        process.exit(1)
    });
    res.send(removedKudo);
});

router.get('/list/:userId', async (req, res) => {
    const kudos = await Kudo.find({destino: req.params.userId},'_id fuente destino tema');
    res.json(kudos);
});


module.exports = router;