import axios from "axios";

const fetchArtist = async (req, res) => {
  const { artistId } = req.body;

  if (!artistId) {
    return res.status(400).send({ message: "albumId is required" });
  }

  try {
    const response = await axios.get(
      `https://saavn.dev/api/artists/${artistId}?songCount=50&albumCount=20`
    );
    return res.status(200).send(response.data);
  } catch (error) {
    console.error("album error", error);
    return res.status(500).send({ message: "album error", error });
  }
};

export { fetchArtist };
