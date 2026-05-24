"use server";

export type FormState = {
  full_name: string;
  email: string;
  location: string;
  query: string;
};


export async function saveQuery(data: FormState) {

    const backendUrl = process.env.APP_BACKEND_URL || "http://localhost:8000";
    const response = await fetch(`${backendUrl}/api/contact`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to save query");
    }
    return await response.json();
}