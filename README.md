# Technologies stack

MERN stack (MongoDB, Express, Reactjs and Nodejs)

# Installation

Execute the following command under project directory:

```
docker-compose build
```

```
docker-compose up -d
```

```
docker cp ./backend/db/init.json sector_db:/tmp/init.json
```

```
docker exec sector_db mongoimport -u root -p pass -d test -c master_sector --file ./tmp/init.json --authenticationDatabase=admin --jsonArray
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### Structure

| master_sector |
| ------------- |
| id            |
| parent        |
| level         |
| name          |

| sectors         |
| --------------- |
| id              |
| master_sector[] |
| agree_to_term   |
| name            |

### Sample data

```
{
  "success": true,
  "data": [
    {
      "_id": "6414c0b17221eb386d1b7ed2",
      "name": "Marry",
      "sectors": [
        12,
        94,
        91,
        69,
        66,
        9,
        54,
        556,
        559,
        55,
        57,
        53,
        5
      ],
      "agreeToTerms": true,
      "createdAt": "2023-03-17T19:34:09.689Z",
      "updatedAt": "2023-03-17T19:34:34.440Z",
      "__v": 1
    },
    {
      "_id": "6414c13b7221eb386d1b7ed7",
      "name": "Tony Stark",
      "sectors": [
        19,
        6,
        99,
        12,
        94,
        508,
        227
      ],
      "agreeToTerms": true,
      "createdAt": "2023-03-17T19:36:27.412Z",
      "updatedAt": "2023-03-17T19:36:51.791Z",
      "__v": 0
    }
  ]
}
```

