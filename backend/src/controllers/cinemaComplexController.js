import CinemaComplex from "../models/cinemaComplexModels.js";

export const getCinemaComplexes = async (req, res) => {
    try{
        const cinemaComplexes = await CinemaComplex.find();
        res.status(200).json(cinemaComplexes);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}