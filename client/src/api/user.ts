import { apiRoot } from "./apiRoot";

export const loginUserWithUsernameAndPassword = async (username: string, password: string) => {
    try {
        const response = await fetch(`${apiRoot}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })


        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("error_invalid_credentials");
            } else {
             throw new Error("error_unknown");
            }
        }

        return await response.json();
    } catch (error: any) {
        // Catch any errors that occurred during the fetch or processing
        throw new Error(`Fetch failed: ${error.message}`);
    }
}
