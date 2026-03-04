import { useEffect, useState } from "react"
import { getDecisions, getAnalytics } from "../api/decisionApi"
import type { Decision, Analytics } from "../types/desicion"    
import DecisionForm from "../components/DecisionForm"
import DecisionList from "../components/DecisionList"

function Dashboard() {

  const [decisions, setDecisions] = useState<Decision[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)

  const loadData = async () => {
    const decisionsData = await getDecisions()
    const analyticsData = await getAnalytics()

    setDecisions(decisionsData)
    setAnalytics(analyticsData)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>

      <h1>Decision Tracker</h1>

      {analytics && (
        <div>
          <h3>Analytics</h3>
          <p>Total Decisions: {analytics.total_decisions}</p>
          <p>Accuracy: {analytics.accuracy}%</p>
          <p>Average Confidence: {analytics.average_confidence}</p>
        </div>
      )}

      <DecisionForm refresh={loadData} />

      <DecisionList decisions={decisions} />

    </div>
  )
}

export default Dashboard