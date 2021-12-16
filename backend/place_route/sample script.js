async.series([
    async (callback) => {
            const cityWithHotel = await Cities.where('name', '==', req.body.city).get();
            result2 = cityWithHotel;
            if (cityWithHotel._size === 1) {
                await cityWithHotel.forEach(async (doc) => {
                    hotelsList = [...doc.data().hotels]
                });
                return callback
            } else {
               return callback            }
    },
        async (callback) => {
            if (hotelsList.length) {
            await async.eachSeries(hotelsList, async (doc, cb) => {
                const hotelId = doc._path.segments[1]
                const hotelInCity = await places.doc(hotelId).get();
                hotels = [...hotels, hotelInCity.data()]
                
                })
            return callback
            } else {
               return  callback
        }
        },
        async (callback) => {
        // console.log(hotels,'hote');
            if (hotels.length) {
                await hotels.forEach(async (doc) => {
                console.log(doc);
                // const hotelId = doc._path.segments[1]
                // const hotelInCity = await places.doc(hotelId).get();
                // hotels.push(hotelInCity)
               });
            return callback
            
            } else {
               return  callback
        }
    }
    ], (err, results) => {
        console.log(err);
        console.log(results);
        // console.log(result2,'result2');
    // results is equal to ['one','two']
});