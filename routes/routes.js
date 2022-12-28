//const router = express.Router();
const router = require("./routes-DB");
const path = require("path");



//página não existe
router.get('*', (req, res) => {       
    res.status(404).json({ message: 'Erro, URL inválido.' });
});

module.exports = router;