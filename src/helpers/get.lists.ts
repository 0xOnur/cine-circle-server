import listSchema from "../schemas/list.schema";

const getLists = async (userId: string) => {
  try {
    if (!userId) {
      return;
    }

    // find lists and sort them by updatedAt
    const lists = await listSchema
      .find({ userId: userId })
      .sort({ updatedAt: -1 });

    return lists;
  } catch (error) {
    console.log(error);
  }
};

export default getLists;
