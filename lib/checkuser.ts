import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export async function checkUser() {
    // 1️⃣ Get the Clerk current user (server-side)
    const clerkUser = await currentUser();

    if (!clerkUser) {
        // Not signed in
        return { status: "unauthenticated", user: null };
    }

    // 2️⃣ Check if the user exists in your Prisma DB
    let user = await db.user.findUnique({
        where: { clerkUserID: clerkUser.id },
    });

    // 3️⃣ If not found, create a new DB record
    if (!user) {
        user = await db.user.create({
            data: {
                clerkUserID: clerkUser.id,
                email: clerkUser.emailAddresses[0].emailAddress,
                name: clerkUser.firstName || "",
                imageUrl: clerkUser.imageUrl,
            },
        });
    }

    // 4️⃣ Return the user
    return { status: "authenticated", user };
}
