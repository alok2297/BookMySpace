import Hotel from "../models/Hotel.js";
export const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel);
    }
    catch(error){
        next(error);
    }
}


export const updatedHotel = async (req,res,next)=>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true})
        res.status(200).json(updatedHotel);
    }
    catch(error){
        next(error);
    }
}

export const deleteHotel = async (req,res,next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    }
    catch(error){
        next(error);
    }
}

export const getHotel = async (req,res,next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel);
    }
    catch(error){
        next(error);
    }
}

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: parseInt(min) || 1, $lt: parseInt(max) || 999 },
    }).limit(4).exec();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req,res,next)=>{
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city});
        }))
        res.status(200).json(list);
    }
    catch(error){
        next(error);
    }
}

export const countByType = (req, res, next) => {
    const hotelCountPromise = Hotel.countDocuments({ type: "hotel" });
    const apartmentCountPromise = Hotel.countDocuments({ type: "apartment" });
    const resortCountPromise = Hotel.countDocuments({ type: "resort" });
    const villaCountPromise = Hotel.countDocuments({ type: "villa" });
    const cabinCountPromise = Hotel.countDocuments({ type: "cabin" });
  
    Promise.all([
      hotelCountPromise,
      apartmentCountPromise,
      resortCountPromise,
      villaCountPromise,
      cabinCountPromise
    ])
      .then(counts => {
        res.status(200).json([
          { type: "hotel", count: counts[0] },
          { type: "apartment", count: counts[1] },
          { type: "resort", count: counts[2] },
          { type: "villa", count: counts[3] },
          { type: "cabin", count: counts[4] }
        ]);
      })
      .catch(err => {
        next(err);
      });
  };
  