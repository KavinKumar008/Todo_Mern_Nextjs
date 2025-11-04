import InputModel from "../../../../models/inputModel";
import connectMongo from "../../../../utils/connectMongo";

export async function DELETE(request, { params }) {
  try {
    await connectMongo();
    const { id } = await params;
    // console.log(index, "paramsssss");
    const delitem = await InputModel.findByIdAndDelete(id);

    if (!delitem) {
      return Response.json({ message: "Item not found" }, { status: 404 });
    }
    // console.log(ind, "innnndddddddddddd");
    return Response.json(
      { message: "Deleted successfully!!!" },
      { status: 200 }
    );
  } catch (error) {
    Response.json({ message: "Faileed to delete", error }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectMongo();
    const { id } = await params;
    const { userInput, time } = await request.json();

    const updatedPost = await InputModel.findByIdAndUpdate(
      id,
      { userInput, time },
      { new: true }
    );

    if (!updatedPost) {
      return Response.json({ message: "Post not found" }, { status: 404 });
    }

    return Response.json(
      { message: "Updated successfully", data: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating post:", error);
    return Response.json({ message: "Error updating post" }, { status: 500 });
  }
}
