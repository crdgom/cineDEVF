import CinemaComplex from "../models/cinemaComplexModels.js";
import Auditorium from "../models/auditoriumsModels.js";

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

export const updateCinemaComplex = async (req, res) => {
    const { id } = req.query;
    const auditoriums = await Auditoriums.find({complex_id: id}).length;

    try {
        if (!id) {
            return res.status(400).json({ message: "Missing cinema complex id" });
        }

        const cinemaComplex = await CinemaComplex.findById(id);
        if (!cinemaComplex) {
            return res.status(404).json({ message: "Cinema complex not found" });
        }

        // Actualizar solo los parámetros que se recibieron en la query
        if (req.query.complex_name) {
            cinemaComplex.complex_name = req.query.complex_name;
        }
        if (req.query.complex_number) {
            cinemaComplex.complex_number = req.query.complex_number;
        }
        if (req.query.auditoriums) {
      cinemaComplex.auditoriums = req.query.auditoriums;
        }

    // Actualizar automáticamente el número de salas
        const auditoriumCount = await Auditorium.countDocuments({ cinemaComplex: id });
        cinemaComplex.auditoriums = auditoriumCount;
        if (req.query.street) {
            cinemaComplex.address.street = req.query.street;
        }
        if (req.query.exterior_number) {
            cinemaComplex.address.exterior_number = req.query.exterior_number;
        }
        if (req.query.postal_code) {
            cinemaComplex.address.postal_code = req.query.postal_code;
        }
        if (req.query.city) {
            cinemaComplex.address.city = req.query.city;
        }
        if (req.query.district) {
            cinemaComplex.address.district = req.query.district;
        }
        if (req.query.zone) {
            cinemaComplex.address.zone = req.query.zone;
        }

        const updatedCinemaComplex = await cinemaComplex.save();
        res.status(200).json(updatedCinemaComplex);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCinemaComplex = async (req, res) => {
    const { id } = req.query;

    try {
        if (!id) {
            return res.status(400).json({ message: "Missing cinema complex id" });
        }

        const cinemaComplex = await CinemaComplex.findById(id);
        if (!cinemaComplex) {
            return res.status(404).json({ message: "Cinema complex not found" });
        }

        await cinemaComplex.deleteOne({_id: id});
        res.status(200).json({ message: "Cinema complex deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};