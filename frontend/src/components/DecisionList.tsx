import type { Decision } from "../types/desicion"
import { updateOutcome } from "../api/decisionApi"
import "../styles.css"

interface Props {
    decisions: Decision[]
}



function DecisionList({ decisions }: Props) {
    const handleOutcome = async (id: string, outcome: string) => {
        await updateOutcome(id, {
            outcome,
        })

        window.location.reload()
    }
    return (
        <div>
            <h3>Decisions</h3>

            {decisions.map((d) => (
                <div className="decision-item" key={d.id}>
                    <strong>{d.title}</strong>

                    <p>Confidence: {d.confidence}%</p>
                    <p>Status: {d.status}</p>

                    {d.status === "pending" && (
                        <div className="flex-box">
                            <button onClick={() => handleOutcome(d.id, "success")}>
                                Mark Success
                            </button>

                            <button onClick={() => handleOutcome(d.id, "failure")}>
                                Mark Failure
                            </button>

                            <button onClick={() => handleOutcome(d.id, "neutral")}>
                                Neutral
                            </button>
                        </div>
                    )}

                    {d.status === "completed" && (
                        <p>Outcome: {d.outcome}</p>
                    )}
                </div>
            ))}
        </div>
    )
}

export default DecisionList