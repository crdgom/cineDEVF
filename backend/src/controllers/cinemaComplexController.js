import CinemaComplex from "../models/cinemaComplexModels.js";

export const getCinemaComplexes = async (req, res) => {
    try{
        const cinemaComplexes = await CinemaComplex.find();
        res.status(200).json(cinemaComplexes);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}

export const getCinemaComplex = async (req, res) => {
    const { id } = req.query;
    try{
        if(!id){
            res.status(400).json({message: "Missing cinema complex id"});
        }else{
            const cinemaComplex = await CinemaComplex.findById(id);
        res.status(200).json(cinemaComplex);
        }
        
    }catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createCinemaComplex = async (req, res) =>{
    const { complex_name, complex_number, auditoriums, street, exterior_number, postal_code, city, district, zone} = req.query;

    try{
        const newCinemaComplex = new CinemaComplex({
            complex_name,
            complex_number,
            auditoriums,
            address:{
                street,
                exterior_number,
                postal_code,
                city,
                district,
                zone
            }
        });
        await newCinemaComplex.save();
        res.status(201).json(newCinemaComplex);
    }
    catch(error){
        res.status(409).json({message: error.message});
    }
}