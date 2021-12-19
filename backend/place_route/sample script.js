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



 <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
        <button type="submit">Submit</button>
                                    </form>
                                    { images.map( image => (
        <div key={image}>
          <img src={image}></img>
        </div>
                                    ))
}
      

  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
    const [images, setImages] = useState([])
    
    const submit = async event => {
        event.preventDefault()
        console.log(file);
        console.log(description);
    const result = await postImage({image: file, description})
    // setImages([result.image, ...images])
    }
    
    const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
}
    
   useEffect(() => {
        
   }, [budget, location, fromDate, toDate, images, description, file])
    

   async function postImage({ image, description }) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    console.log(formData);
    const result = await axios.post('/upload/upload_single', formData, { headers: {'Content-Type': 'multipart/form-data'}})
     return result.data
}




            

