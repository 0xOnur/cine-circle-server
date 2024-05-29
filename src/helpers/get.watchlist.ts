import watchlistSchema from "../schemas/watchlist.schema";

const getWatchlist = async (userId: string) => {
  try {
    if (!userId) {
      return;
    }

    const exist = await watchlistSchema.findOne({ userId });

    if (exist) {
      exist.medias.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      return exist;
    }

    const watchlist = new watchlistSchema({
      userId,
      medias: [],
    });

    await watchlist.validate();
    await watchlist.save();

    return watchlist;
  } catch (error) {
    console.log(error);
  }
};

export default getWatchlist;
