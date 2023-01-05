const router = require("./DB/routes").router_DB;
const checkAuth = require("./DB/routes").checkAuth;
const path = require("path");



//página não existe
router.get('*', (req, res) => {       
    res.status(404).json({ message: 'Erro, URL inválido.' });
});

module.exports = router;