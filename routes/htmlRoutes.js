const router = require("express").Router();
const path = require("path");



router.get("/", (req, res) =>{

    res.sendFile(path.join(__dirname, "../public/index.html"));
    
})
router.get("/exercise", (req, res) =>{

res.sendFile(path.join(__dirname, "../public/exercise.html"));

})

router.get("/edit", (req, res) =>{

    res.sendFile(path.join(__dirname, "../public/edit.html"));
    
})

router.get("/stats", (req, res) =>{

    res.sendFile(path.join(__dirname, "../public/stats.html"));
    
})
router.get("/allworkouts", (req, res) =>{

    res.sendFile(path.join(__dirname, "../public/allworkouts.html"));
    
})


module.exports = router;