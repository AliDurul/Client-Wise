"use server";

const API_BASE_URL = process.env.API_BASE_URL;

// ─── Forgot Password ──────────────────────────────────────────────────────────

export const forgotPasswordAction = async (
    _: unknown,
    payload: FormData
): Promise<{ success: boolean; message: string; inputs?: { email: string } }> => {
    const email = (payload.get("email") as string | null)?.trim() ?? "";

    if (!email) {
        return { success: false, message: "Email address is required.", inputs: { email } };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { success: false, message: "Please enter a valid email address.", inputs: { email } };
    }

    try {
        const res = await fetch(`${API_BASE_URL}/auth/forget-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
            cache: "no-store",
            signal: AbortSignal.timeout(30_000),
        });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Request failed.");
        }

        return { success: true, message: data.message || "Password reset link sent to your email." };
    } catch (err: unknown) {
        const message =
            err instanceof Error && err.name === "TimeoutError"
                ? "The server is taking too long to respond. Please try again."
                : err instanceof Error
                ? err.message
                : "Something went wrong.";

        return { success: false, message, inputs: { email } };
    }
};

// ─── Reset Password ───────────────────────────────────────────────────────────

export const resetPasswordAction = async (
    token: string,
    _: unknown,
    payload: FormData
): Promise<{ success: boolean; message: string }> => {
    const password = (payload.get("password") as string | null) ?? "";
    const confirmPassword = (payload.get("confirmPassword") as string | null) ?? "";

    if (!password) {
        return { success: false, message: "New password is required." };
    }

    if (password.length < 8 || password.length > 16) {
        return { success: false, message: "Password must be between 8 and 16 characters." };
    }

    if (password !== confirmPassword) {
        return { success: false, message: "Passwords do not match." };
    }

    try {
        const res = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
            cache: "no-store",
            signal: AbortSignal.timeout(30_000),
        });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Password reset failed.");
        }

        return { success: true, message: data.message || "Password reset successfully." };
    } catch (err: unknown) {
        const message =
            err instanceof Error && err.name === "TimeoutError"
                ? "The server is taking too long to respond. Please try again."
                : err instanceof Error
                ? err.message
                : "Something went wrong.";

        return { success: false, message };
    }
};
