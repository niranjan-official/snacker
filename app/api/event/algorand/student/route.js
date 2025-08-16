import { db } from "@/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({
      success: false,
      error: "Email parameter is required",
    });
  }

  try {
    const q = query(
      collection(db, "algorand-students"),
      where("email", "==", email)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return NextResponse.json({
        success: false,
        error: "Student not found",
      });
    }

    const studentDoc = querySnapshot.docs[0];
    const studentData = {
      id: studentDoc.id,
      ...studentDoc.data(),
    };

    return NextResponse.json({
      success: true,
      student: studentData,
    });
  } catch (error) {
    console.error("Error fetching student data:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch student data",
    });
  }
}
