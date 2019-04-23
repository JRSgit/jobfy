const express = require('express');
const routes = express.Router();
const DadosCtrl = require('../control');


routes.get('/', DadosCtrl.show);
routes.get('/vaga/:id', DadosCtrl.showVagasId);
routes.get('/admin', (req, res) => {
    res.render('admin/home');
});
routes.get('/admin/vagas', DadosCtrl.showAdmVaga);
routes.get('/admin/vaga/delete/:id', DadosCtrl.deleteVaga);
routes.get('/admin/vagas/nova', DadosCtrl.novaVagas);
routes.get('/admin/vaga/editar/:id', DadosCtrl.novaVagasId);
routes.post('/admin/vagas/nova', DadosCtrl.saveVagas);
routes.post('/admin/vaga/editar/:id', DadosCtrl.editarVagas);
// rotas das categorias =============================
routes.get('/admin/categorias', DadosCtrl.showCateg);
routes.get('/admin/categoria/nova', async(req, res) => {
    res.render('admin/nova-categ');
});
routes.post('/admin/categoria/nova', DadosCtrl.saveCateg);
routes.get('/admin/categoria/delete/:id', DadosCtrl.deleteCateg);


module.exports = routes;