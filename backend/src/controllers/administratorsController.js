export const getAdmin = async (req, res) => {
  try {
    const { id, name } = req.query;
    res.status(200).json({ id, name });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};