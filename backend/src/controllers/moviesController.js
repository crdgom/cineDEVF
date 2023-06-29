import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import 'dotenv/config';
import Movie from '../models/movieModel.js';
import Auditorium from '../models/auditoriumsModels.js';
import CinemaComplex from '../models/cinemaComplexModel.js';

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ACCESS,
  region: process.env.AWS_REGION
});

const s3 = new aws.S3();

export const uploadMovieImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.originalname });
    },
    key: function (req, file, cb) {
      const originalName = file.originalname;
      const fileName = originalName.replace(/\s+/g, '-'); // replace spaces with dashes
      cb(null, 'movies/' + Date.now().toString() + '-' + fileName);
    }
  })
});

// Obtener todas las películas
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una película por su ID
export const getMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    
    if (!movie) {
      return res.status(404).json({ message: 'No se encontró la película especificada' });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva película
export const createMovie = async (req, res) => {
    try {
      const { title, genre, duration, releaseDate, schedules } = req.body;
      const { location } = req.file; // Obtener la URL de la imagen subida a AWS S3
  
      // Validar que la letra de la sala exista
      const validSchedules = await Promise.all(schedules.map(async (schedule) => {
        const { auditorium, cinemaComplex } = schedule;
        const complex = await Complex.findOne({ complex_name: cinemaComplex }).exec();
        
        if (!complex) {
          throw new Error(`Complex '${cinemaComplex}' not found`);
        }
        
        const auditoriumExists = complex.auditoriums.includes(auditorium);
        
        if (!auditoriumExists) {
          throw new Error(`Auditorium '${auditorium}' not found in complex '${cinemaComplex}'`);
        }
        
        return { auditorium, cinemaComplex, time: schedule.time };
      }));
  
      const movie = new Movie({
        title,
        genre,
        duration,
        releaseDate,
        schedules: validSchedules,
        image: location // Guardar la URL de la imagen en el campo 'image' del modelo
      });
  
      const createdMovie = await movie.save();
      res.status(201).json(createdMovie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Actualizar una película por su ID
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, duration, releaseDate, schedules } = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, genre, duration, releaseDate, schedules },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: 'No se encontró la película especificada' });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una película por su ID
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    
    if (!deletedMovie) {
      return res.status(404).json({ message: 'No se encontró la película especificada' });
    }

    res.status(200).json({ message: 'Película eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar películas por la letra de la sala (auditorium)
export const searchMoviesByAuditorium = async (req, res) => {
  try {
    const { auditorium } = req.query;
    const movies = await Movie.find({ 'schedules.auditorium': auditorium });
    
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
