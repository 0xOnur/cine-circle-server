import listSchema from "../schemas/list.schema";

const getLists = async (userId: string) => {
  try {
    if (!userId) {
      return;
    }

    const lists = await listSchema.find({ user: userId });

    return lists;
  } catch (error) {
    console.log(error);
  }
};

export default getLists;
