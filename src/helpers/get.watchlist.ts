import watchlistSchema from "../schemas/watchlist.schema";

const getWatchlist = async (userId: string) => {
  try {
    if (!userId) {
      return;
    }

    const exist = await watchlistSchema.findOne({ userId });

    if (exist) {
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
