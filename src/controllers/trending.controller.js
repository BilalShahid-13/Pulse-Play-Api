import axios from "axios";

const trending = async (req, res) => {
  try {
    const response = await axios.get(
      `https://saavn.dev/api/search/songs?query=bollywood 2024&limit=20`
    );
    return res.status(200).send({
      message: "trending songs fetched successfully",
      data: response.data.data.results,
    });
  } catch (error) {
    console.error("trending error", error);
  }
};

export { trending };
