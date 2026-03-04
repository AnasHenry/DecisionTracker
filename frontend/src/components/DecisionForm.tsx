import { useState } from "react"
import { createDecision } from "../api/decisionApi"

interface Props {
  refresh: () => void
}

function DecisionForm({ refresh }: Props) {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [confidence, setConfidence] = useState<number>(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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
    <form onSubmit={handleSubmit}>
      <h3>Create Decision</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br />

      <input
        type="number"
        placeholder="Confidence"
        value={confidence}
        onChange={(e) => setConfidence(Number(e.target.value))}
      /><br />

      <button type="submit">Save</button>
    </form>
  )
}

export default DecisionForm