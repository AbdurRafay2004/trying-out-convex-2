import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

export function SignIn() {
    const { signIn } = useAuthActions();
    const [step, setStep] = useState("signIn");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);

        try {
            await signIn("password", formData);
        } catch (err) {
            setError(err.message || "Authentication failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">
                        <span className="logo-icon">🎯</span>
                    </div>
                    <h1>{step === "signIn" ? "Welcome Back" : "Create Account"}</h1>
                    <p className="auth-subtitle">
                        {step === "signIn"
                            ? "Sign in to continue clicking"
                            : "Join us and start clicking!"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                            required
                            autoComplete={step === "signUp" ? "new-password" : "current-password"}
                            minLength={6}
                        />
                    </div>

                    <input name="flow" type="hidden" value={step} />

                    {error && (
                        <div className="error-message">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <span className="btn-loading">
                                <span className="spinner"></span>
                                {step === "signIn" ? "Signing in..." : "Creating account..."}
                            </span>
                        ) : (
                            step === "signIn" ? "Sign In" : "Sign Up"
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        {step === "signIn" ? "Don't have an account?" : "Already have an account?"}
                    </p>
                    <button
                        type="button"
                        className="switch-btn"
                        onClick={() => {
                            setStep(step === "signIn" ? "signUp" : "signIn");
                            setError("");
                        }}
                    >
                        {step === "signIn" ? "Sign up instead" : "Sign in instead"}
                    </button>
                </div>
            </div>

            <div className="auth-decoration">
                <div className="floating-circle circle-1"></div>
                <div className="floating-circle circle-2"></div>
                <div className="floating-circle circle-3"></div>
            </div>
        </div>
    );
}
