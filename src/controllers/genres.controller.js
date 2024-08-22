import axios from "axios";
const genres = async (req, res) => {
  const { genresName } = req.body;

  if (!genresName) {
    return res.status(400).json({ message: "genre field is required" });
  }

  try {
    const response = await axios.get(
      `https://saavn.dev//api/search/songs?query=${genresName} genre&limit=20`
    );

    return res.status(200).json({
      message: `${genresName} genre searched successfully`,
      data: response.data.data.results,
    });
  } catch (error) {
    console.error("genre error", error);
    return res.status(500).json({ message: "genre error", error });
  }
};

export { genres };
