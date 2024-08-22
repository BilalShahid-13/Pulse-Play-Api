import axios from "axios";
import NodeCache from "node-cache";

const nodeCache = new NodeCache();
const Search = async (req, res) => {
  const { search } = req.body;

  if (!search) {
    return res.status(400).json({ message: "Search field is required" });
  }

  try {
    const response = await axios.get(
      `https://saavn.dev/api/search/songs?query=${search}`
    );

    return res.status(200).json({
      message: "data searched successfully",
      data: response.data.data.results,
    });
  } catch (error) {
    console.error("search error", error);
    return res.status(500).json({ message: "search error", error });
  }
};

const songSuggestion = async (req, res) => {
  const { id = "UMnoXQil", pageLimit = 10 } = req.body;

  if (!id) {
    return res.staus(400).json({ message: "id field is required" });
  }

  if (nodeCache.has("songSuggestion")) {
    return res.status(200).json({
      message: "suggestions of songs searched successfully",
      data: nodeCache.get("songSuggestion"),
    });
  }

  try {
    const response = await axios.get(
      `https://saavn.dev/api/songs/${id}/suggestions?limit=${pageLimit}`
    );

    nodeCache.set("songSuggestion", response.data.data.results);
    return res.status(200).json({
      message: "data searched successfully",
      data: response.data.data.results,
    });
  } catch (error) {
    console.error("search error", error);
    return res.status(500).json({ message: "search error", error });
  }
};
export { Search, songSuggestion };
