import { useState } from "react"
import { createDecision } from "../api/decisionApi"

interface Props {
    refresh: () => void
}

function DecisionForm({ refresh }: Props) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [confidence, setConfidence] = useState<number>(0)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title || !description) {
            setError("Please fill all the fields")

            setTimeout(() => setError(""), 3000)
            return
        }

        if (confidence < 0 || confidence > 100) {
            setError("Confidence must be between 0 and 100")

            setTimeout(() => setError(""), 3000)
            return
        }

        await createDecision({
            title,
            description,
            confidence
        })

        setTitle("")
        setDescription("")
        setConfidence(0)

        refresh()
    }

    return (
        <>
            {error && <div className="toast-error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <h3>Create Decision</h3>

                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Confidence"
                    value={confidence}
                    onChange={(e) => setConfidence(Number(e.target.value))}
                />

                <button type="submit">Save</button>
            </form>
        </>
    )
}

export default DecisionForm