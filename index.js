const { parse } = require('csv-parse');
const fs = require('fs');
const results = [];

function isHabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

//readable.pipe(writeable)
fs.createReadStream('kepler-data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data)=>{
        if(isHabitablePlanet(data)){
            results.push(data)
        }
    })
    .on('error', (err)=>{
        console.log(err)
    })
    .on('end', ()=>{
        console.log(results);
        console.log('done');
        console.log(results.length);
    });
