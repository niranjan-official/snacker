import { db } from "@/firebase/config";
import { auth, currentUser } from "@clerk/nextjs/server";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { userId } = auth();
    console.log("UserId: ",userId);
    
    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const user = await currentUser();
    console.log("UserData: ",user);
    
    if (!user) {
      return NextResponse.json({ error: "User details not found" }, { status: 404 });
    }

    await setDoc(doc(db, "users", userId), {
      name: user.username,
      userId: user.id,
      credit: 0,
      timeStamp: serverTimestamp()
    });

    return new NextResponse(null, {
        status: 301,
        headers: {
          Location: "http://localhost:3000",
        },
      });
    
  } catch (error) {
    console.error("Error creating user:", error);
    return new NextResponse(null, {
        status: 302,
        headers: {
          Location: "http://localhost:3000/api/auth/create-user",
        },
      });
  }
}
