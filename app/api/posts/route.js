import InputModel from "../../../models/inputModel";
import connectMongo from "../../../utils/connectMongo";

export async function POST(request) {
  try {
    await connectMongo();
    const inputData = await request.json();
    console.log(request, "frontenddddd", inputData);
    const res = await InputModel.create({
      userInput: inputData.userInput,
      time: inputData.time,
    });
    return Response.json(
      { message: "Data Created Done!!!", data: res },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "Failed to Created" });
  }
}

// export async function DELETE(request, { params }) {
//   try {
//     await connectMongo();
//     console.log(params, "paramssss");
//     const ind = params.index;
//     const delitem = await InputModel.findByIdAndDelete(ind);
//     console.log(ind, "innnndddddddddddd");
//     return Response.json(
//       { message: "Deleted successfully!!!", data: delitem },
//       { status: 200 }
//     );
//   } catch (error) {
//     Response.json({ message: "Faileed to delete" }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    await connectMongo();
    const getAllData = await InputModel.find();
    console.log(getAllData, "getalldata");
    return Response.json(
      { message: "Data fetched successfully", data: getAllData },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Failed to get data", error },
      { status: 500 }
    );
  }
}
