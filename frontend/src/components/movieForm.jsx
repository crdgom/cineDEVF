import useForm from '@/hooks/useForm'
import { useNavigate } from 'react-router-dom'

const MovieForm = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [duration, setDuration] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [selectedAuditorium, setSelectedAuditorium] = useState('');
  const [selectedCinemaComplex, setSelectedCinemaComplex] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleAddSchedule = () => {
    if (selectedAuditorium && selectedCinemaComplex && selectedTime) {
      const newSchedule = {
        auditorium: selectedAuditorium,
        cinemaComplex: selectedCinemaComplex,
        time: selectedTime
      };
      setSchedules([...schedules, newSchedule]);
      setSelectedAuditorium('');
      setSelectedCinemaComplex('');
      setSelectedTime('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario al servidor para crear la película
    // Puedes utilizar fetch, axios u otra librería para hacer la solicitud HTTP
    // Recuerda incluir el campo 'image' para la imagen de la película

    // Luego de crear la película, puedes redirigir o mostrar un mensaje de éxito
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Genre:</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div>
          <label>Duration:</label>
          <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <div>
          <label>Release Date:</label>
          <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
        </div>
        <div>
          <h3>Schedules:</h3>
          <div>
            <label>Auditorium:</label>
            <input type="text" value={selectedAuditorium} onChange={(e) => setSelectedAuditorium(e.target.value)} />
          </div>
          <div>
            <label>Cinema Complex:</label>
            <input type="text" value={selectedCinemaComplex} onChange={(e) => setSelectedCinemaComplex(e.target.value)} />
          </div>
          <div>
            <label>Time:</label>
            <input type="text" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
          </div>
          <button type="button" onClick={handleAddSchedule}>Add Schedule</button>
          <ul>
            {schedules.map((schedule, index) => (
              <li key={index}>
                Auditorium: {schedule.auditorium}, Cinema Complex: {schedule.cinemaComplex}, Time: {schedule.time}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MovieForm;
