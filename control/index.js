const sqlite = require('sqlite');
const path = require('path');
const _dbConnection = sqlite.open(path.resolve(__dirname,'../banco.sqlite'), { Promise });

class DadosControll {
    // função que pega as vagas no banco de dabos
    async show(req, res) {
        const _db = await _dbConnection;
        const categoriasDb = await _db.all('select * from categorias;');
        const vagas = await _db.all('select * from vagas;');
        const categorias = categoriasDb.map(cat => {
            return {
                ...cat,
                vagas: vagas.filter(vaga => vaga.categoria === cat.id)
            }
        });
        res.render('home', {
            categoria: categorias
        });
    }
    //==============================================================
    async showVagasId(req, res) {
        const _db = await _dbConnection;
        const id = req.params.id;
        const vagas = await _db.get('select * from vagas where id = ' + id);
        res.render('vaga', {
            vagas
        });
    }
    //==============================================================
    async novaVagas(req, res) {
        const _db = await _dbConnection;
        const categ = await _db.all('select * from categorias;');
        res.render('admin/nova-vaga', {
            categoria: categ
        });
    };
    //==============================================================
    async novaVagasId(req, res){
        const _db = await _dbConnection;
        const categ = await _db.all('select * from categorias;');
        const vaga = await _db.get(` select * from vagas where id = ${req.params.id}`);
        res.render('admin/editar-vaga', {
            categoria: categ, vaga: vaga
        });
    }
    //==============================================================
    async editarVagas(req, res){
        const { titulo, descricao, categoria } = req.body;
        const { id } = req.params;
        const _db = await _dbConnection;
        await _db.run (`update vagas set categoria = ${categoria}, titulo = '${titulo}',descricao = '${descricao}' where id = ${id}`);
        res.redirect('/admin/vagas');
    }
    //==============================================================
    async showAdmVaga(req, res) {
        const _db = await _dbConnection;
        const vagas = await _db.all('select * from vagas;');
        res.render('admin/vagas', {
            vagas
        });
    }
    //==============================================================
    async deleteVaga(req, res) {
        const _db = await _dbConnection;
        const id = req.params.id;
        await _db.run('delete from vagas where id = ' + id + '');
        res.status(200).redirect('/admin/vagas');
    }
    //==============================================================
    async saveVagas(req, res) {
        const { titulo, descricao, categoria } = req.body;
        const _db = await _dbConnection;
        await _db.run(`insert into vagas(categoria, titulo, descricao) values('${categoria}', '${titulo}', '${descricao}')`)
        res.redirect('/admin/vagas');
    }
    //=======================================================
    // Funções que pegar os dados de gategoria no banco
    async showCateg(req, res) {
        const _db = await _dbConnection;
        // const categoriasDb = await _db.all('select * from categorias;');
        const categ = await _db.all('select * from categorias;');  
        res.render('admin/categoria', {
            categoria: categ
        });
    }
    //==============================================================
    async saveCateg(req, res) {
        const { categoria } = req.body;
        const _db = await _dbConnection;
        await _db.run(`insert into categorias(categoria) values('${categoria}')`);
        res.redirect('/admin/categorias');
    }
    //==============================================================
    async deleteCateg(req, res) {
        try {
            const _db = await _dbConnection;
            const id = req.params.id;
            await _db.run(`delete from categorias where id = ${id}`);
            res.status(200).redirect('/admin/categorias');
            
        } catch (error) {
            console.log(error);
            
        }
    }

};

module.exports = new DadosControll();