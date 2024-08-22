import axios from "axios";

const fetchAlbum = async (req, res) => {
  const { albumId } = req.body;

  if (!albumId) {
    return res.status(400).send({ message: "albumId is required" });
  }

  try {
    const response = await axios.get(
      `https://saavn.dev/api/albums?id=${albumId}`
    );
    return res.status(200).send(response.data.data);
  } catch (error) {
    console.error("album error", error);
    return res.status(500).send({ message: "album error", error });
  }
};

export { fetchAlbum };
