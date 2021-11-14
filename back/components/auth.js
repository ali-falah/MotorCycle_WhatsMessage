const router = require('express').Router();
const fs = require('fs');
const { exec } = require("child_process");



router.get('/checkauth', async (req, res) => {
    client.getState().then((data) => {
        console.log(data)
        res.send(data)
    }).catch((err) => {
        if (err) {
            res.send("DISCONNECTED")
            try {
                fs.unlinkSync('../session.json')
            } catch(err) {
                console.log(err)
            }
        }
    })
});

router.get('/getqr', (req,res) => {
    var qrjs = fs.readFileSync('components/qrcode.js');

    fs.readFile('components/last.qr', (err,last_qr) => {
        fs.readFile('session.json', (serr, sessiondata) => {
            if (err && sessiondata) {
                res.write("<html><body><h2>Already Authenticated</h2></body></html>");
                res.end();
            } else if (!err && serr) {
                var page = `
                    <html>
                        <body>
                            <script>${qrjs}</script>
                            <div id="qrcode"></div>
                            <script type="text/javascript">
                                new QRCode(document.getElementById("qrcode"), "${last_qr}");
                            </script>
                        </body>
                    </html>
                `
                res.write(page)
                res.end();
            }
        })
    });
});

router.get('/clearauth', (req, res) => {
    //files to clear
    path = require('path').dirname(require.main.filename)+"\\session.json"
    pathLastQr = require('path').dirname(require.main.filename)+"\\components\\last.qr"

    if (fs.existsSync(path)) {
        // path exists
        exec("del /f "+path, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });

        exec("del /f "+pathLastQr, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });


      } else {
        console.log("DOES NOT exist:", path);
      }

     
    

      res.send("ok");
});


module.exports = router;