const http = require('http');

const PORT = 3000;

const friends = [
    {
        id: 0,
        name: 'Surajit Dan',
    },
    {
        id: 1,
        name: 'Rajesh Dan',
    },
    {
        id: 2,
        name: 'Gaju Dan',
    }
]

// make a POST request from browser
// fetch('http://localhost:3000/friends', {
//     method: 'POST',
//     body: JSON.stringify({id: 3, name: 'Raju Dan'})
// })
// .then((response) => response.json())
// .then((friend) => console.log(friend));

const server = http.createServer((req, res) => {
    const items = req.url.split('/');
    if (req.method === 'POST' && items[1] === 'friends') {
        req.on('data', (data) => {
            const friend = data.toString()
            console.log('Request: ', friend);
            friends.push(JSON.parse(friend))
        });
        req.pipe(res)
    } else if (req.method === 'GET' && items[1] === 'friends') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        if (items.length === 3) {
            const friendIndex = Number(items[2]);
            res.end(JSON.stringify(friends[friendIndex]));
        } else {
            res.end(JSON.stringify(friends));
        }
    } else if (req.method === 'GET' && items[1] === 'messages') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Surajit</li>');
        res.write('<li>Hello again</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>')
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})