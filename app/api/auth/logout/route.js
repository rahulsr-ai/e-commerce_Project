import { cookies } from "next/headers";

export async function POST() {
    try {
        cookies().set({
            name: "authToken",
            value: "",
            path: "/",
            maxAge: -1, // ❌ Expires the cookie immediately
        });
        return Response.json({ message: "Logged out successfully" }, { status: 200 });
    } catch (error) {
        console.error("Logout Error:", error);
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
}
