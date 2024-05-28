import reviewSchema from "../schemas/review.schema";

const getReviews = async (userId: string) => {
  try {
    if (!userId) {
      return;
    }

    const reviews = await reviewSchema.find({ userId });

    return reviews;
  } catch (error) {
    console.log(error);
  }
};

export default getReviews;
