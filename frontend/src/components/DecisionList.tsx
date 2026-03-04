import type { Decision } from "../types/desicion"

interface Props {
  decisions: Decision[]
}

function DecisionList({ decisions }: Props) {
  return (
    <div>
      <h3>Decisions</h3>

      {decisions.map((d) => (
        <div key={d.id}>
          <strong>{d.title}</strong>
          <p>Confidence: {d.confidence}%</p>
          <p>Status: {d.status}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default DecisionList