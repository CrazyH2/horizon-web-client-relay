/*
  @author CrazyH2 / github.com/crazyh2
 */

const express = require('express');
const netApi = require('net-browserify');

const resolveSrv = async function (hostname) {
    try {
      var req = await fetch(`https://dns.google.com/resolve?name=${hostname}&type=SRV`);
      var res = await req.json();
      return await res;
    } catch(e) {
      return null;
    };
  };

const app = express();

app.get("/api/resolveSrv", async(req, res) => {
    var query = await resolveSrv(req.query.name);
    if(query == null) return res.json({});
    res.json(query);
  });

app.use(netApi({ allowOrigin: '*' }));

// Start the server
const server = app.listen(process.argv[2] === undefined ? 8080 : process.argv[2], function () {
  console.log('Server listening on port ' + server.address().port)
});
