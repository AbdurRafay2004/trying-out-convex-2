import { useQuery, useMutation } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "../../convex/_generated/api";
import { useState, useCallback } from "react";

export function ClickCounter() {
    const { signOut } = useAuthActions();
    const score = useQuery(api.scores.getScore);
    const incrementScore = useMutation(api.scores.incrementScore);
    const [isClicking, setIsClicking] = useState(false);
    const [clickAnimation, setClickAnimation] = useState(false);

    const handleClick = useCallback(async () => {
        setIsClicking(true);
        setClickAnimation(true);

        try {
            await incrementScore();
        } catch (err) {
            console.error("Failed to increment score:", err);
        } finally {
            setIsClicking(false);
            setTimeout(() => setClickAnimation(false), 200);
        }
    }, [incrementScore]);

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <div className="counter-container">
            <header className="counter-header">
                <div className="header-logo">
                    <span className="logo-icon">🎯</span>
                    <span className="logo-text">Click Master</span>
                </div>
                <button onClick={handleSignOut} className="signout-btn">
                    <span>Sign Out</span>
                    <span className="signout-icon">→</span>
                </button>
            </header>

            <main className="counter-main">
                <div className="score-section">
                    <div className="score-label">Your Score</div>
                    <div className={`score-value ${clickAnimation ? 'score-bump' : ''}`}>
                        {score !== null && score !== undefined ? (
                            <span className="score-number">{score.toLocaleString()}</span>
                        ) : (
                            <span className="score-loading">...</span>
                        )}
                    </div>
                    <div className="score-subtitle">clicks and counting!</div>
                </div>

                <button
                    onClick={handleClick}
                    className={`click-button ${isClicking ? 'clicking' : ''}`}
                    disabled={score === null || score === undefined}
                >
                    <span className="button-content">
                        <span className="button-icon">👆</span>
                        <span className="button-text">CLICK ME!</span>
                    </span>
                    <span className="button-glow"></span>
                </button>

                <div className="counter-info">
                    <p>🔄 Score updates in real-time</p>
                </div>
            </main>

            <div className="counter-decoration">
                <div className="star star-1">✦</div>
                <div className="star star-2">✦</div>
                <div className="star star-3">★</div>
                <div className="star star-4">✦</div>
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
            </div>
        </div>
    );
}
